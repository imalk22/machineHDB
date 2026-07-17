'use client'

import VideoModal from '@/components/VideoModal'
import Specs from '@/components/Specs'
import Applications from '@/components/Applications'
import FAQ from '@/components/FAQ'
import WhyChoose from '@/components/WhyChoose'
import Pricing from '@/components/Pricing'

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Auto-playing video with pricing overlay */}
      <VideoModal isOpen={true} onClose={() => {}} autoPlay={true} />

      {/* Product details sections */}
      <Specs />
      <Applications />
      <Pricing />
      <FAQ />
      <WhyChoose />
    </main>
  )
}
