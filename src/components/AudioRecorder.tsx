import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { audioService, IRecordingSession } from '../services/audioService';

interface IAudioRecorderProps {
  conversationId: string;
  onRecordingStart?: () => void;
  onRecordingStop?: (session: IRecordingSession) => void;
  onError?: (error: string) => void;
  chunkDuration?: number; // in milliseconds
  quality?: 'low' | 'medium' | 'high';
}

const AudioRecorder: React.FC<IAudioRecorderProps> = ({
  conversationId,
  onRecordingStart,
  onRecordingStop,
  onError,
  chunkDuration = 2000,
  quality = 'medium',
}) => {
  const [recordingStatus, setRecordingStatus] = useState<'recording' | 'paused' | 'stopped' | 'idle'>('idle');
  const [currentSession, setCurrentSession] = useState<IRecordingSession | null>(null);
  const [queuedChunks, setQueuedChunks] = useState<number>(0);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkPermissions();
    
    // Set up status polling
    const statusInterval = setInterval(() => {
      const status = audioService.getRecordingStatus();
      const session = audioService.getCurrentSession();
      const queueCount = audioService.getQueuedChunksCount();
      
      setRecordingStatus(status);
      setCurrentSession(session);
      setQueuedChunks(queueCount);
    }, 500);

    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  const checkPermissions = async () => {
    try {
      const granted = await audioService.requestPermissions();
      setHasPermissions(granted);
      
      if (!granted) {
        Alert.alert(
          'Microphone Permission Required',
          'Please grant microphone access to record audio for conversations.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Permission check failed:', error);
      setHasPermissions(false);
    }
  };

  const handleStartRecording = async () => {
    if (!hasPermissions) {
      await checkPermissions();
      return;
    }

    setIsLoading(true);
    try {
      const sessionId = await audioService.startRecording({
        conversationId,
        chunkDuration,
        quality,
        enableNoiseSuppression: true,
      });

      console.log(`Started recording session: ${sessionId}`);
      onRecordingStart?.();
    } catch (error: any) {
      const errorMessage = `Failed to start recording: ${error.message}`;
      console.error(errorMessage);
      onError?.(errorMessage);
      Alert.alert('Recording Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopRecording = async () => {
    setIsLoading(true);
    try {
      const session = await audioService.stopRecording();
      if (session) {
        console.log(`Stopped recording session: ${session.id}`);
        console.log(`Total chunks recorded: ${session.chunks.length}`);
        onRecordingStop?.(session);
      }
    } catch (error: any) {
      const errorMessage = `Failed to stop recording: ${error.message}`;
      console.error(errorMessage);
      onError?.(errorMessage);
      Alert.alert('Recording Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseRecording = async () => {
    try {
      await audioService.pauseRecording();
      console.log('Recording paused');
    } catch (error: any) {
      const errorMessage = `Failed to pause recording: ${error.message}`;
      console.error(errorMessage);
      onError?.(errorMessage);
      Alert.alert('Recording Error', errorMessage);
    }
  };

  const handleResumeRecording = async () => {
    try {
      await audioService.resumeRecording();
      console.log('Recording resumed');
    } catch (error: any) {
      const errorMessage = `Failed to resume recording: ${error.message}`;
      console.error(errorMessage);
      onError?.(errorMessage);
      Alert.alert('Recording Error', errorMessage);
    }
  };

  const getStatusText = () => {
    switch (recordingStatus) {
      case 'recording':
        return 'Recording...';
      case 'paused':
        return 'Paused';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Ready to Record';
    }
  };

  const getStatusColor = () => {
    switch (recordingStatus) {
      case 'recording':
        return '#FF6B6B'; // Red for recording
      case 'paused':
        return '#FFB347'; // Orange for paused
      case 'stopped':
        return '#4ECDC4'; // Teal for stopped
      default:
        return '#95A5A6'; // Gray for idle
    }
  };

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!hasPermissions) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Microphone permission is required for audio recording
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={checkPermissions}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Status Indicator */}
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
        {isLoading && <ActivityIndicator size="small" color="#FFFFFF" style={styles.spinner} />}
      </View>

      {/* Recording Info */}
      {currentSession && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Duration: {formatDuration(Date.now() - currentSession.startTime)}
          </Text>
          <Text style={styles.infoText}>
            Chunks: {currentSession.chunks.length}
          </Text>
          {queuedChunks > 0 && (
            <Text style={styles.infoText}>
              Uploading: {queuedChunks} chunks
            </Text>
          )}
        </View>
      )}

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        {recordingStatus === 'idle' || recordingStatus === 'stopped' ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStartRecording}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.activeControls}>
            {recordingStatus === 'recording' ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.pauseButton]}
                  onPress={handlePauseRecording}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.stopButton]}
                  onPress={handleStopRecording}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.resumeButton]}
                  onPress={handleResumeRecording}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.stopButton]}
                  onPress={handleStopRecording}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      {/* Quality Indicator */}
      <View style={styles.qualityContainer}>
        <Text style={styles.qualityText}>Quality: {quality.toUpperCase()}</Text>
        <Text style={styles.qualityText}>Chunk Duration: {chunkDuration / 1000}s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  permissionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spinner: {
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  controlsContainer: {
    marginBottom: 15,
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resumeButton: {
    backgroundColor: '#2196F3',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  qualityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  qualityText: {
    fontSize: 12,
    color: '#666',
  },
});

export default AudioRecorder; 