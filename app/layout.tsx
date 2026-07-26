import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Sinhala } from 'next/font/google'
import Script from 'next/script'
import MetaPixelContactTracker from '@/components/MetaPixelContactTracker'
import './globals.css'

// Same font as https://hdbeng.netlify.app/ — normal Unicode Sinhala (no FM conversion)
const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sinhala',
  display: 'swap',
  preload: true,
})

const GA_ID = 'G-2YVGT3DXXP'
const META_PIXEL_ID = '2918076888326024'

const metadataBase = new URL('https://kottucuttingmachine.lk')

export const metadata: Metadata = {
  metadataBase,
  title: 'කොත්තු කැපිමේ යන්ත්‍රය | HDB Engineering Lanka',
  description:
    'Commercial Kottu Cutting Machine — 10% OFF, last price රු. 89,550. Island-wide delivery. Call or WhatsApp HDB Engineering Lanka, Dambulla.',
  openGraph: {
    title: 'Commercial Kottu Cutting Machine | HDB Engineering Lanka',
    description: '10% OFF — Last Price රු. 89,550. Island-wide delivery',
    images: ['/images/kottu-1.jpg'],
    locale: 'si_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Kottu Cutting Machine | HDB Engineering Lanka',
    description: '10% OFF — Last Price රු. 89,550. Island-wide delivery',
    images: ['/images/kottu-1.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="si" className={`${notoSansSinhala.variable} ${notoSansSinhala.className}`}>
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>
      <body className="font-sans text-white antialiased" style={{ backgroundColor: '#0b1f3a' }}>
        {children}
        <MetaPixelContactTracker />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
