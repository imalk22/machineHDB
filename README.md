# Kottu Cutting Machine Landing Page

A professional, modern landing page built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your site!

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
kottu-cutting/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── VideoModal.tsx      # Video modal with animated CTA
│   ├── Features.tsx        # Features grid
│   ├── Specs.tsx           # Technical specifications
│   ├── Benefits.tsx        # Benefits sections
│   ├── Testimonials.tsx    # Customer testimonials
│   ├── Pricing.tsx         # Pricing section
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer
├── public/
│   └── videos/             # 📍 ADD YOUR VIDEO HERE
│       └── machine-demo.mp4
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🎬 Adding Your Video

### Step 1: Prepare Your Video File
- Place your video file in the `public/videos/` folder
- Rename it to `machine-demo.mp4` (or keep your name and update code)
- Supported formats: MP4, WebM, Ogg

### Step 2: Video File Path
The video should be at: `public/videos/machine-demo.mp4`

### Step 3: Folder Location
```
c:/Users/imesh/Music/kottu cutting/public/videos/
├── machine-demo.mp4  ← PUT YOUR VIDEO FILE HERE
```

### Step 4: That's It!
The video will automatically appear when users click the "🎬 වීඩියෝ බලන්න" button.

---

## ⚙️ Features

✅ **Hero Section** - Animated gradient background with floating elements  
✅ **Video Modal** - Plays video in fullscreen modal  
✅ **Animated CTA** - Button appears at 50% of video with pulse animation  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Smooth Animations** - Framer Motion for professional transitions  
✅ **Dark Theme** - Professional dark gradient design  
✅ **Contact Integration** - WhatsApp & Phone call buttons  
✅ **Testimonials** - Customer reviews section  
✅ **Pricing** - Special offer display with urgency  

---

## 🎨 Customization

### Change Contact Numbers
Edit `components/VideoModal.tsx` and `components/CTA.tsx`:
```typescript
// Change this number
window.location.href = 'tel:+94760360560'

// And this WhatsApp number
window.open(`https://wa.me/94760360560?text=${message}`, '_blank')
```

### Modify Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#1a1a2e",    // Dark blue
  secondary: "#16213e",  // Darker blue
  accent: "#ff6b6b",     // Red (change this!)
}
```

### Update Content
Each component is a standalone file. Edit the text, images, or data directly in:
- `components/Features.tsx` - Feature list
- `components/Testimonials.tsx` - Testimonials
- `components/Pricing.tsx` - Pricing info
- `components/Footer.tsx` - Contact info

---

## 📞 Contact Info (Already Added)

- **Phone**: 076 0 360 560 / 076 0 450 451
- **Email**: hdbengineeringlanka@gmail.com
- **Address**: No. 218, Kurunegala Road, Dambulla, Sri Lanka

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the `.next` folder to Netlify
```

### Deploy to Any Server
```bash
npm run build
npm run start
```

---

## 📦 Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **Framer Motion 10** - Animations
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons

---

## 🎯 Tips

1. **Video Performance**: Compress your MP4 video for faster loading
   - Use: https://www.freeconvert.com/video-compressor
   - Target: 10-50MB for web

2. **Hosting Videos**: For large videos, consider:
   - YouTube (embed in iframe)
   - Vimeo
   - AWS S3
   - Cloudinary

3. **Mobile Testing**: Test on real devices using:
   ```bash
   npm run dev
   # Visit from phone: http://YOUR_IP:3000
   ```

---

## 🐛 Troubleshooting

### Video not playing?
- Check file path: `public/videos/machine-demo.mp4`
- Verify video format is MP4
- Check browser console for errors

### Animations not smooth?
- Install Framer Motion: `npm install framer-motion`
- Clear `.next` cache: `rm -rf .next`

### Build errors?
```bash
npm install
npm run build
```

---

## 📝 License

© 2026 HDB Engineering Lanka (PVT) Ltd. All rights reserved.

---

## 🎉 You're Ready!

Your professional landing page is now live. Just add your video and deploy! 🚀
