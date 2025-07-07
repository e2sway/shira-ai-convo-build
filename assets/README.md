# Assets Directory

This directory will contain all static assets for the Shira AI Conversation Builder app.

## Required Assets (Currently Missing)

To complete your app setup, you'll need to add these image files:

### 📱 App Icon
- **File**: `icon.png`
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Purpose**: Main app icon shown on device home screens

### 🎨 Splash Screen  
- **File**: `splash.png`
- **Size**: 1242x2436 pixels (iPhone X resolution)
- **Format**: PNG
- **Purpose**: Loading screen when app starts

### 🤖 Android Adaptive Icon
- **File**: `adaptive-icon.png` 
- **Size**: 1024x1024 pixels
- **Safe area**: Keep content within 672x672 center
- **Format**: PNG with transparency
- **Purpose**: Android adaptive icon system

### 🌐 Web Favicon
- **File**: `favicon.png`
- **Size**: 32x32 pixels
- **Format**: PNG
- **Purpose**: Browser tab icon for web version

## Current Status

✅ **App will run without these assets** - Expo uses defaults  
⚠️ **For production** - You should add custom assets  
📝 **Optional** - Start development without them, add later

## Quick Setup Options

### Option 1: Use Expo's Built-in Assets (Recommended for now)
- Your app is ready to run as-is
- Expo will use default icon and splash screen
- Perfect for development and testing

### Option 2: Add Custom Assets Later
1. Create or obtain your images
2. Save them in this `assets/` folder with exact names above
3. Update `app.json` to reference them:
   ```json
   {
     "expo": {
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png"
       },
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png"
         }
       },
       "web": {
         "favicon": "./assets/favicon.png"
       }
     }
   }
   ```

### Option 3: Generate Assets with AI
You can use tools like:
- Midjourney or DALL-E for custom designs
- Figma with AI plugins
- Canva's AI design tools

## Asset Guidelines

- **Keep it simple**: Icons work best with minimal detail
- **Brand consistency**: Use your brand colors and style
- **Test on devices**: Check how icons look on actual phones
- **Optimize file sizes**: Compress without losing quality

---

**💡 Tip**: You can start developing immediately without these assets. Add them when you're ready to polish your app! 