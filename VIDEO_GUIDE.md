# 🎬 WHERE TO ADD YOUR VIDEO - QUICK GUIDE

## 📍 Video Folder Location

### Windows Path:
```
c:\Users\imesh\Music\kottu cutting\public\videos\
```

### In VS Code:
1. Left sidebar → Explorer
2. Expand folder tree
3. Go to: `kottu cutting` → `public` → `videos`
4. Right-click → "Reveal in Explorer"
5. Paste your `machine-demo.mp4` file here

---

## 📝 Video File Requirements

| Requirement | Details |
|-------------|---------|
| **Format** | MP4 (h.264 codec) |
| **Filename** | `machine-demo.mp4` |
| **Size** | Recommended: 10-50MB |
| **Duration** | Any length works |
| **CTA Timing** | Button appears at 50% of video |

---

## 🎥 Steps to Add Video

### Step 1: Prepare Your Video
```
Your video file should be named: machine-demo.mp4
```

### Step 2: Copy to Correct Folder
```
Copy: machine-demo.mp4
Paste into: c:\Users\imesh\Music\kottu cutting\public\videos\
```

### Step 3: Verify
- Open terminal
- Run: `npm run dev`
- Visit: `http://localhost:3000`
- Click "🎬 වීඩියෝ බලන්න" button
- Video should play! ✅

---

## 📊 Folder Structure

```
kottu cutting/
│
└── public/
    └── videos/
        └── machine-demo.mp4  ← PUT YOUR VIDEO HERE 🎬
```

---

## 💾 How to Compress Video (If Too Large)

### Option 1: Online Tool (Easiest)
1. Visit: https://www.freeconvert.com/video-compressor
2. Upload your MP4
3. Download compressed file
4. Rename to: `machine-demo.mp4`
5. Copy to: `public/videos/`

### Option 2: Use VLC Media Player
1. Open VLC: https://www.videolan.org/
2. Media → Convert/Save
3. Select your video
4. Convert to MP4
5. Choose quality: 1024 kbps
6. Save as: `machine-demo.mp4`

### Option 3: Use FFmpeg
```bash
ffmpeg -i yourVideo.mp4 -b:v 2000k -bufsize 2000k machine-demo.mp4
```

---

## ✅ Testing Video

### Quick Test:
```bash
cd "c:\Users\imesh\Music\kottu cutting"
npm run dev
```

### In Browser:
1. Go to: http://localhost:3000
2. Click: "🎬 වීඩියෝ බලන්න" button
3. Video should appear in modal
4. Play video
5. At 50% point, button appears saying:
   ```
   📞 මිලදිගැනීමට අවශ්‍ය නම් දැන්ම අමතන්න
   ```

---

## 🎯 Video CTA Animation Details

| Feature | Details |
|---------|---------|
| **Trigger** | At 50% of video duration |
| **Button Text** | "📞 මිලදිගැනීමට අවශ්‍ය නම් දැන්ම අමතන්න" |
| **Animation** | Pop-up with pulse glow |
| **Action** | Calls phone number when clicked |
| **Styles** | Red gradient, shadow effect |

---

## 🔧 Advanced: Change Video Location

If you want to host video elsewhere:

### Option A: YouTube
Edit `components/VideoModal.tsx`:
```typescript
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  className="w-full h-full"
/>
```

### Option B: External Server
Edit `components/VideoModal.tsx`:
```typescript
<video src="https://your-domain.com/videos/machine-demo.mp4" />
```

### Option C: Cloudinary
```typescript
<video src="https://res.cloudinary.com/your-account/video/upload/v1/machine-demo.mp4" />
```

---

## 🎬 Video Technical Specs

### Recommended Encoding:
```
Video Codec: H.264
Audio Codec: AAC
Container: MP4
Resolution: 1920x1080 (Full HD)
Frame Rate: 30 fps
Bitrate: 2000-3000 kbps
```

### File Size Examples:
- 1 minute video: ~25MB
- 5 minute video: ~125MB (compress this!)
- 10 minute video: ~250MB (too large!)

---

## 📱 Mobile Testing

### Test Video on Phone:
1. Get your computer IP:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address"

2. On your phone, visit:
   ```
   http://YOUR_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

3. Test video playback
4. Test mobile responsiveness

---

## 🚨 Troubleshooting Video

### Video won't play?
- ✓ Check filename: `machine-demo.mp4`
- ✓ Check folder: `public/videos/`
- ✓ Check format: MP4 (h.264)
- ✓ Browser console (F12) for errors

### Video too slow?
- ✓ Compress video (see above)
- ✓ Check file size: < 50MB
- ✓ Use quality: 1080p max

### CTA button not appearing?
- ✓ Video must load completely
- ✓ Check video duration
- ✓ Open browser console (F12)
- ✓ Look for error messages

---

## ✨ Final Checklist

- [ ] Video file: `machine-demo.mp4`
- [ ] Location: `public/videos/`
- [ ] Format: MP4
- [ ] Size: < 50MB
- [ ] Server running: `npm run dev`
- [ ] Browser: http://localhost:3000
- [ ] Video plays in modal ✓
- [ ] CTA appears at 50% ✓
- [ ] Button works (calls/WhatsApp) ✓

---

## 🎉 You're Done!

Your video is now integrated and the CTA button will appear at the perfect moment! 🚀

---

**For more help, see:** `README.md` and `SETUP.md`
