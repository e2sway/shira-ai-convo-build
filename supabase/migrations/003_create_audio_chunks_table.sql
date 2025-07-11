-- Migration: Create conversation_audio_chunks table
-- Run this in Supabase SQL Editor or via CLI

-- Create table for storing audio chunk metadata
CREATE TABLE IF NOT EXISTS conversation_audio_chunks (
  id BIGSERIAL PRIMARY KEY,
  chunk_id TEXT NOT NULL UNIQUE,
  conversation_id BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  sequence_number INTEGER NOT NULL,
  duration_ms INTEGER DEFAULT 0,
  file_size INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create indices for better query performance
CREATE INDEX IF NOT EXISTS idx_audio_chunks_conversation_id ON conversation_audio_chunks(conversation_id);
CREATE INDEX IF NOT EXISTS idx_audio_chunks_timestamp ON conversation_audio_chunks(timestamp);
CREATE INDEX IF NOT EXISTS idx_audio_chunks_sequence ON conversation_audio_chunks(conversation_id, sequence_number);

-- Enable RLS (Row Level Security) for audio chunks
ALTER TABLE conversation_audio_chunks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audio chunks
CREATE POLICY "Users can insert own audio chunks" ON conversation_audio_chunks
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view own audio chunks" ON conversation_audio_chunks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own audio chunks" ON conversation_audio_chunks
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

-- Create policy for deletion (optional)
CREATE POLICY "Users can delete own audio chunks" ON conversation_audio_chunks
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM conversations 
    WHERE conversations.id = conversation_id 
    AND conversations.user_id = auth.uid()
  )
); 