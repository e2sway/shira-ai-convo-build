# 🚀 Supabase Setup Instructions

## ✅ What's Already Done
- ✅ Supabase client installed and configured
- ✅ Environment variables template created (`env.example`)
- ✅ TypeScript database types defined
- ✅ Secure error handling and logging
- ✅ Session management utilities

## 🎯 Next Steps for You

### 1. Create Your New Supabase Project (5 minutes)
1. **Go to**: https://supabase.com/dashboard
2. **Click**: "New Project" (green button)
3. **Fill out**:
   - **Project Name**: `shira-ai-convo-build` (or your preference)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing**: Free tier (perfect for development)
4. **Click**: "Create new project"
5. **Wait**: ~2 minutes for setup

### 2. Get Your Project Credentials
1. In your new project dashboard, click **Settings** → **API**
2. **Copy these values** (we'll store them securely):
   - **Project URL** (looks like: `https://abc123.supabase.co`)
   - **anon key** (long string starting with `eyJ...`)

### 3. Create Your Secure Environment File
1. **Copy** the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```
2. **Open** `.env` and replace the placeholder values:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

### 4. Test the Connection
Run this to test your setup:
```bash
npm start
```
Look for the console message: "Supabase client initialized" ✅

## 🗄️ Database Tables to Create

Once your project is ready, we'll create these tables in your Supabase dashboard:

### **users** - User profiles and preferences
- `id` (uuid, primary key)
- `email` (text, unique)
- `full_name` (text, optional)
- `preferred_language` (text, optional)
- `learning_goals` (text[], optional)
- `created_at` / `updated_at` (timestamps)

### **conversations** - AI chat sessions
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key → users.id)
- `title` (text)
- `scenario_type` (text)
- `difficulty_level` (enum: beginner/intermediate/advanced)
- `audio_url` (text, optional)
- `transcript` (text, optional)
- `status` (enum: active/completed/paused)
- `created_at` / `updated_at` (timestamps)

### **user_progress** - Learning tracking
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key → users.id)
- `conversation_id` (uuid, foreign key → conversations.id)
- `completion_percentage` (integer, 0-100)
- `achievements_unlocked` (text[])
- `streak_count` (integer)
- `last_activity` (timestamp)
- `created_at` / `updated_at` (timestamps)

### **prompts** - Conversation templates
- `id` (uuid, primary key)
- `name` (text)
- `content` (text)
- `scenario_type` (text)
- `difficulty_level` (enum: beginner/intermediate/advanced)
- `language` (text, default: 'en')
- `is_active` (boolean, default: true)
- `created_at` / `updated_at` (timestamps)

## 🔐 Security Setup
We'll also configure:
- **Row Level Security (RLS)** on all tables
- **Authentication** (email + social logins)
- **Storage buckets** for audio files

## ❓ Need Help?
Just let me know when you've:
1. ✅ Created your new Supabase project
2. ✅ Created your `.env` file with the credentials
3. ✅ Tested the connection (npm start shows "Supabase client initialized")

Then I'll guide you through creating the database tables! 🎉 