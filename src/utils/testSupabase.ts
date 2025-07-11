import { supabase } from '../services/supabaseClient';
import { conversationService } from '../services/conversationService';

export const testSupabaseConnection = async () => {
  console.log('🧪 Testing Supabase Connection...');
  
  try {
    // Test 2: Check tables exist
    const tables = ['users', 'conversations', 'user_progress', 'prompts'];
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(1);
      if (tableError) {
        console.error(`❌ Table '${table}' not accessible:`, tableError.message);
        return false;
      }
      console.log(`✅ Table '${table}' accessible`);
    }

    // Test 3: Check Storage Bucket
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.error('❌ Storage error:', bucketError.message);
      return false;
    }
    
    const audioBucket = buckets?.find(bucket => bucket.name === 'audio-recordings');
    if (audioBucket) {
      console.log('✅ Audio recordings bucket found');
    } else {
      console.error('❌ Audio recordings bucket not found');
      return false;
    }

    console.log('🎉 All Supabase general tests passed!');
    return true;

  } catch (error) {
    console.error('❌ Supabase test failed:', error);
    return false;
  }
};

// Dedicated conversation service test
export const testConversationService = async () => {
  console.log('🧪 Testing Conversation Service specifically...');
  
  try {
    const testUserId = `local-test-${Date.now()}`;
    console.log(`📡 Calling conversation service for user: ${testUserId}`);
    
    const data = await conversationService.initiateLiveSession({
      userId: testUserId,
      sessionType: 'conversation',
      difficulty: 'beginner',
      category: 'general'
    });
    
    if (data) {
      console.log('✅ Conversation Service Success!');
      console.log('🔍 Response data:', {
        conversationId: data.conversationId,
        promptTitle: data.prompt?.title,
        message: data.message,
      });
      
      // Verify the conversation was created
      if (data.conversationId) {
        const { data: conversation, error: convError } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', data.conversationId)
          .single();
          
        if (convError) {
          console.error('❌ Failed to verify conversation:', convError.message);
          return false;
        }
        
        console.log('✅ Conversation verified in database:', {
          id: conversation.id,
          status: conversation.status,
          userId: conversation.user_id
        });
      }
      
      return true;
    } else {
      console.log('⚠️ Conversation service returned no data');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Conversation service test failed:', error);
    return false;
  }
};

// Simple test to verify audio service can initialize
export const testAudioService = async () => {
  console.log('🧪 Testing Audio Service...');
  
  try {
    const { audioService } = await import('../services/audioService');
    
    // Test basic status
    const status = audioService.getRecordingStatus();
    console.log(`✅ Audio service status: ${status}`);
    
    // Test queue count
    const queueCount = audioService.getQueuedChunksCount();
    console.log(`✅ Audio queue count: ${queueCount}`);
    
    console.log('🎉 Audio service test passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Audio service test failed:', error);
    return false;
  }
}; 