# 🚀 Complete Setup Guide - Kottu Cutting Machine Landing Page

## Step-by-Step Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control)
- **VS Code** (recommended editor)

---

## 🎯 PART 1: Initial Setup

### 1️⃣ Open Terminal

**On Windows:**
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

**In VS Code:**
- Press `Ctrl + `` ` (backtick) to open integrated terminal

### 2️⃣ Navigate to Your Project Folder

```bash
cd "c:\Users\imesh\Music\kottu cutting"
```

### 3️⃣ Install Dependencies

This will download all required packages (~500MB):

```bash
npm install
```

⏳ **Wait 2-5 minutes** for installation to complete.

### 4️⃣ Start Development Server

```bash
npm run dev
```

✅ **Success Message:**
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 5️⃣ Open in Browser

- Click the link: `http://localhost:3000`
- Or open browser and go to: `http://localhost:3000`
- You should see your beautiful landing page! 🎉

---

## 🎬 PART 2: Add Your Video

### 📍 Video Folder Location

```
c:\Users\imesh\Music\kottu cutting\public\videos\
```

### 📁 Step-by-Step:

1. **Prepare your video file**
   - Video format: MP4 (recommended)
   - File name: `machine-demo.mp4`
   - File size: Keep under 50MB for faster loading
   - Duration: Any length (CTA button will appear at 50% point)

2. **Copy video to correct folder**
   - Navigate to: `c:\Users\imesh\Music\kottu cutting\public\videos\`
   - Paste your `machine-demo.mp4` file here
   - That's it! The website will auto-detect it

3. **Verify video works**
   - Go back to browser (http://localhost:3000)
   - Click "🎬 වීඩියෝ බලන්න" button
   - Video should play! 🎥
   - At 50% of video, "📞 අමතන්න" button appears ✨

### 📊 Video Compression Tips

If your video is too large, compress it:

**Online Tool (Easiest):**
- Visit: https://www.freeconvert.com/video-compressor
- Upload your MP4
- Download compressed version
- Place in `public/videos/` folder

**Using FFmpeg (Advanced):**
```bash
ffmpeg -i input-video.mp4 -b:v 2000k -bufsize 2000k output-video.mp4
```

---

## 🌐 PART 3: Customization

### Change Phone Numbers

**File:** `components/VideoModal.tsx`

Find this line (around line 60):
```typescript
window.location.href = 'tel:+94760360560'
```

Change `+94760360560` to your phone number.

**File:** `components/CTA.tsx`

Find similar phone number lines and update them.

### Change WhatsApp Numbers

**File:** `components/VideoModal.tsx` and `components/CTA.tsx`

Find this line:
```typescript
window.open(`https://wa.me/94760360560?text=${message}`, '_blank')
```

Change `94760360560` to your WhatsApp number.

### Change Business Info

**File:** `components/Footer.tsx`

Update:
- Company name
- Address
- Email
- Phone numbers
- Opening hours

Example:
```typescript
<p>📍 Your Address Here</p>
<p>📞 Your Phone Number</p>
<p>📧 Your Email</p>
```

### Change Colors

**File:** `tailwind.config.ts`

Change the accent color (red):
```typescript
accent: "#ff6b6b",  // Change this to your color code
// Examples:
// Blue: "#3b82f6"
// Green: "#10b981"
// Purple: "#8b5cf6"
```

---

## 📤 PART 4: Deploy to Internet

### Option A: Deploy to Vercel (Recommended - Free & Easy)

1. **Create account:**
   - Go to: https://vercel.com
   - Sign up (free)

2. **Deploy from CLI:**
   ```bash
   npm install -g vercel
   vercel
   ```
   
   Follow the prompts to connect your GitHub/local folder.

3. **Your site is live!** 🎉
   - You'll get a URL like: `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to:** https://netlify.com
   - Drag and drop the `.next` folder

3. **Live instantly!** ✨

### Option C: Self-Hosted

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy to your server:**
   - Upload files to hosting
   - Run: `npm start`
   - Server runs on port 3000

---

## 🧪 PART 5: Testing

### Test on Desktop
```bash
npm run dev
```
- Visit: `http://localhost:3000`

### Test on Mobile/Tablet
1. Get your computer's IP:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. On mobile, visit:
   ```
   http://192.168.1.100:3000
   ```

3. Test all features:
   - ✅ Hero animations
   - ✅ Video opens correctly
   - ✅ Video CTA button appears at 50%
   - ✅ Phone button works
   - ✅ WhatsApp button works
   - ✅ Scroll through all sections
   - ✅ Mobile responsiveness

---

## 📋 PART 6: Checklist Before Launch

- [ ] Video added to `public/videos/machine-demo.mp4`
- [ ] Video plays in modal
- [ ] CTA button appears at 50% of video
- [ ] Phone numbers updated
- [ ] WhatsApp numbers updated
- [ ] Business info updated
- [ ] Footer info correct
- [ ] Colors/branding look good
- [ ] Mobile view tested
- [ ] Links work (phone, WhatsApp, social media)
- [ ] All text/translations correct
- [ ] Deployed to live server

---

## 🚨 Troubleshooting

### Problem: "npm: command not found"
**Solution:**
- Install Node.js: https://nodejs.org/
- Restart terminal/VS Code

### Problem: Video not showing
**Solution:**
- Check file location: `public/videos/machine-demo.mp4`
- Check file name is exact: `machine-demo.mp4`
- Verify video format is MP4
- Clear browser cache: `Ctrl + Shift + Delete`

### Problem: Port 3000 already in use
**Solution:**
```bash
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Problem: Styles not loading (CSS issues)
**Solution:**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Problem: Build errors
**Solution:**
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

---

## 📚 Project Files Overview

```
📁 kottu cutting/
├── 📄 package.json           ← Project dependencies
├── 📄 tsconfig.json          ← TypeScript config
├── 📄 tailwind.config.ts     ← Styling config
├── 📄 next.config.js         ← Next.js config
├── 📄 README.md              ← Documentation
├── 📄 SETUP.md               ← This file
│
├── 📁 app/                   ← Main application
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Page layout
│   └── globals.css           ← Global styles
│
├── 📁 components/            ← React components
│   ├── Hero.tsx              ← Top section
│   ├── VideoModal.tsx        ← Video player
│   ├── Features.tsx          ← Features section
│   ├── Specs.tsx             ← Specifications
│   ├── Benefits.tsx          ← Benefits section
│   ├── Testimonials.tsx      ← Reviews
│   ├── Pricing.tsx           ← Pricing
│   ├── CTA.tsx               ← Call-to-action
│   └── Footer.tsx            ← Footer
│
└── 📁 public/                ← Static files
    └── 📁 videos/            ← 🎬 ADD YOUR VIDEO HERE
        └── machine-demo.mp4  ← Your video file
```

---

## 🎓 Learning Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion

---

## 💡 Tips for Success

1. **Keep video size small** - Compress before uploading
2. **Test on mobile** - Most users will be on phones
3. **Clear cache** - If styles look weird, clear browser cache
4. **Monitor console** - Press F12 to see errors
5. **Backup your work** - Use Git or cloud storage

---

## 🎉 You're All Set!

Your professional landing page is ready! 

**Next Steps:**
1. Add your video
2. Customize text/colors
3. Test thoroughly
4. Deploy to web
5. Share with clients!

**Questions?**
- Check README.md for more info
- Google the error message
- Ask ChatGPT for help

---

## 📞 Support

- **Email:** hdbengineeringlanka@gmail.com
- **Phone:** 076 0 360 560
- **Address:** No. 218, Kurunegala Road, Dambulla, Sri Lanka

---

**Good luck! 🚀**
