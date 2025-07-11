import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { supabase } from './supabaseClient';

export interface IAudioChunk {
  id: string;
  uri: string;
  duration: number;
  size: number;
  timestamp: number;
  conversationId: string;
  sequenceNumber: number;
}

export interface IRecordingOptions {
  conversationId: string;
  chunkDuration?: number; // in milliseconds, default 2000 (2 seconds)
  quality?: 'low' | 'medium' | 'high';
  enableNoiseSuppression?: boolean;
}

export interface IRecordingSession {
  id: string;
  conversationId: string;
  startTime: number;
  chunks: IAudioChunk[];
  status: 'recording' | 'paused' | 'stopped';
  totalDuration: number;
}

class AudioService {
  private recording: Audio.Recording | null = null;
  private currentSession: IRecordingSession | null = null;
  private recordingTimer: NodeJS.Timeout | null = null;
  private chunkQueue: IAudioChunk[] = [];
  private isUploading: boolean = false;
  private permissionsGranted: boolean = false;

  constructor() {
    this.initializeAudio();
  }

  /**
   * Initialize audio settings
   */
  private async initializeAudio(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  /**
   * Request microphone permissions for recording
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const permission = await Audio.requestPermissionsAsync();
      this.permissionsGranted = permission.status === 'granted';
      return this.permissionsGranted;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  /**
   * Start a new recording session with chunked recording
   */
  async startRecording(options: IRecordingOptions): Promise<string> {
    if (!this.permissionsGranted) {
      const hasPermissions = await this.requestPermissions();
      if (!hasPermissions) {
        throw new Error('Microphone permissions not granted');
      }
    }

    // Stop any existing recording
    if (this.currentSession?.status === 'recording') {
      await this.stopRecording();
    }

    const sessionId = `session_${Date.now()}`;
    const chunkDuration = options.chunkDuration || 2000; // Default 2 seconds

    this.currentSession = {
      id: sessionId,
      conversationId: options.conversationId,
      startTime: Date.now(),
      chunks: [],
      status: 'recording',
      totalDuration: 0,
    };

    try {
      // Start initial recording
      await this.startChunkRecording(options);

      // Set up timer for chunked recording
      this.recordingTimer = setInterval(async () => {
        await this.rotateRecordingChunk(options);
      }, chunkDuration);

      return sessionId;
    } catch (error) {
      this.currentSession = null;
      throw new Error(`Failed to start recording: ${error.message}`);
    }
  }

  /**
   * Start recording a single chunk
   */
  private async startChunkRecording(options: IRecordingOptions): Promise<void> {
    if (!this.currentSession) return;

    try {
      // Configure recording options based on quality
      const recordingOptions: Audio.RecordingOptions = {
        android: {
          extension: '.mp3',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: options.quality === 'high' ? 44100 : 22050,
          numberOfChannels: 1,
          bitRate: options.quality === 'high' ? 128000 : 64000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: options.quality === 'high' 
            ? Audio.IOSAudioQuality.MAX 
            : Audio.IOSAudioQuality.MEDIUM,
          sampleRate: options.quality === 'high' ? 44100 : 22050,
          numberOfChannels: 1,
          bitRate: options.quality === 'high' ? 128000 : 64000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: options.quality === 'high' ? 128000 : 64000,
        },
      };

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(recordingOptions);
      await this.recording.startAsync();
    } catch (error) {
      console.error('Failed to start chunk recording:', error);
      throw error;
    }
  }

  /**
   * Stop current chunk and start a new one (for continuous chunked recording)
   */
  private async rotateRecordingChunk(options: IRecordingOptions): Promise<void> {
    if (!this.currentSession || this.currentSession.status !== 'recording' || !this.recording) {
      return;
    }

    try {
      // Stop current chunk
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      
      if (uri) {
        // Get recording status for duration info
        const status = await this.recording.getStatusAsync();
        
        // Create chunk metadata
        const chunk: IAudioChunk = {
          id: `chunk_${this.currentSession.chunks.length + 1}`,
          uri,
          duration: status.isLoaded ? status.durationMillis || 0 : 0,
          size: 0, // Will be determined during upload
          timestamp: Date.now(),
          conversationId: this.currentSession.conversationId,
          sequenceNumber: this.currentSession.chunks.length + 1,
        };

        this.currentSession.chunks.push(chunk);
        this.chunkQueue.push(chunk);

        // Start processing upload queue
        this.processUploadQueue();

        // Start next chunk immediately
        await this.startChunkRecording(options);
      }
    } catch (error) {
      console.error('Error rotating recording chunk:', error);
    }
  }

  /**
   * Pause the current recording session
   */
  async pauseRecording(): Promise<void> {
    if (!this.currentSession || this.currentSession.status !== 'recording' || !this.recording) {
      return;
    }

    try {
      await this.recording.pauseAsync();
      this.currentSession.status = 'paused';

      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }
    } catch (error) {
      throw new Error(`Failed to pause recording: ${error.message}`);
    }
  }

  /**
   * Resume a paused recording session
   */
  async resumeRecording(): Promise<void> {
    if (!this.currentSession || this.currentSession.status !== 'paused' || !this.recording) {
      return;
    }

    try {
      await this.recording.startAsync();
      this.currentSession.status = 'recording';

      // Restart the chunking timer
      const chunkDuration = 2000; // Default chunk duration
      this.recordingTimer = setInterval(async () => {
        await this.rotateRecordingChunk({ conversationId: this.currentSession!.conversationId });
      }, chunkDuration);
    } catch (error) {
      throw new Error(`Failed to resume recording: ${error.message}`);
    }
  }

  /**
   * Stop the current recording session
   */
  async stopRecording(): Promise<IRecordingSession | null> {
    if (!this.currentSession) {
      return null;
    }

    try {
      // Stop recording timer
      if (this.recordingTimer) {
        clearInterval(this.recordingTimer);
        this.recordingTimer = null;
      }

      // Stop and save final chunk
      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
        const uri = this.recording.getURI();
        
        if (uri) {
          const status = await this.recording.getStatusAsync();
          
          const finalChunk: IAudioChunk = {
            id: `chunk_${this.currentSession.chunks.length + 1}`,
            uri,
            duration: status.isLoaded ? status.durationMillis || 0 : 0,
            size: 0,
            timestamp: Date.now(),
            conversationId: this.currentSession.conversationId,
            sequenceNumber: this.currentSession.chunks.length + 1,
          };

          this.currentSession.chunks.push(finalChunk);
          this.chunkQueue.push(finalChunk);
        }

        this.recording = null;
      }

      // Update session status
      this.currentSession.status = 'stopped';
      this.currentSession.totalDuration = Date.now() - this.currentSession.startTime;

      // Process any remaining uploads
      this.processUploadQueue();

      const completedSession = this.currentSession;
      this.currentSession = null;

      return completedSession;
    } catch (error) {
      throw new Error(`Failed to stop recording: ${error.message}`);
    }
  }

  /**
   * Process the upload queue for chunks
   */
  private async processUploadQueue(): Promise<void> {
    if (this.isUploading || this.chunkQueue.length === 0) {
      return;
    }

    this.isUploading = true;

    while (this.chunkQueue.length > 0) {
      const chunk = this.chunkQueue.shift();
      if (chunk) {
        try {
          await this.uploadChunkToStorage(chunk);
        } catch (error) {
          console.error(`Failed to upload chunk ${chunk.id}:`, error);
          // Re-queue the chunk for retry
          this.chunkQueue.unshift(chunk);
          break;
        }
      }
    }

    this.isUploading = false;
  }

  /**
   * Upload a chunk to Supabase Storage
   */
  private async uploadChunkToStorage(chunk: IAudioChunk): Promise<void> {
    try {
      // Get user ID from current session
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create file path: {user_id}/{conversation_id}/chunk_{sequence}.{ext}
      const fileExtension = Platform.OS === 'ios' ? 'm4a' : 'mp3';
      const fileName = `chunk_${chunk.sequenceNumber.toString().padStart(3, '0')}.${fileExtension}`;
      const filePath = `${user.id}/${chunk.conversationId}/${fileName}`;

      // Read file as blob/buffer
      const response = await fetch(chunk.uri);
      const blob = await response.blob();

      // Upload to storage
      const { data, error } = await supabase.storage
        .from('audio-recordings')
        .upload(filePath, blob, {
          contentType: `audio/${fileExtension}`,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      console.log(`✅ Uploaded chunk ${chunk.id} to ${filePath}`);

      // Save metadata to database
      await this.saveChunkMetadata(chunk, filePath);

    } catch (error) {
      console.error(`❌ Failed to upload chunk ${chunk.id}:`, error);
      throw error;
    }
  }

  /**
   * Save chunk metadata to database
   */
  private async saveChunkMetadata(chunk: IAudioChunk, storagePath: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('conversation_audio_chunks')
        .insert({
          conversation_id: chunk.conversationId,
          chunk_id: chunk.id,
          sequence_number: chunk.sequenceNumber,
          storage_path: storagePath,
          duration_ms: chunk.duration,
          timestamp: new Date(chunk.timestamp).toISOString(),
        });

      if (error) {
        throw error;
      }

      console.log(`✅ Saved metadata for chunk ${chunk.id}`);
    } catch (error) {
      console.error(`❌ Failed to save metadata for chunk ${chunk.id}:`, error);
      throw error;
    }
  }

  /**
   * Get current recording session
   */
  getCurrentSession(): IRecordingSession | null {
    return this.currentSession;
  }

  /**
   * Get current recording status
   */
  getRecordingStatus(): 'recording' | 'paused' | 'stopped' | 'idle' {
    return this.currentSession?.status || 'idle';
  }

  /**
   * Get number of chunks in upload queue
   */
  getQueuedChunksCount(): number {
    return this.chunkQueue.length;
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    if (this.recordingTimer) {
      clearInterval(this.recordingTimer);
      this.recordingTimer = null;
    }

    if (this.recording) {
      try {
        await this.recording.stopAndUnloadAsync();
      } catch (error) {
        console.error('Error cleaning up recording:', error);
      }
      this.recording = null;
    }

    this.currentSession = null;
    this.chunkQueue = [];
    this.isUploading = false;
  }
}

// Export singleton instance
export const audioService = new AudioService();
export default audioService; 