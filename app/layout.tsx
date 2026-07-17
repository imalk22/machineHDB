import type { Metadata } from 'next'
import { Noto_Sans_Sinhala } from 'next/font/google'
import './globals.css'

const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sinhala',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kottu Cutting Machine | Professional Solution',
  description: 'The ultimate Kottu cutting machine for professional kitchens and businesses',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSansSinhala.variable}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-slate-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
