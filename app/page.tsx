'use client'

import VideoModal from '@/components/VideoModal'
import SpecsSection from '@/components/funnel/SpecsSection'
import StatsSection from '@/components/funnel/StatsSection'
import FAQSection from '@/components/funnel/FAQSection'
import YoutubeDemoSection from '@/components/funnel/YoutubeDemoSection'
import KottuMachine from '@/components/funnel/KottuMachine'
import WhyChooseUs from '@/components/funnel/WhyChooseUs'
import SocialProof from '@/components/funnel/SocialProof'
import FeedbackVideoSection from '@/components/funnel/FeedbackVideoSection'
import HowItWorks from '@/components/funnel/HowItWorks'
import ContactSection from '@/components/funnel/ContactSection'
import StickyCTABar from '@/components/StickyCTABar'
import FloatingCallButton from '@/components/funnel/FloatingCallButton'
import BlueprintPattern from '@/components/BlueprintPattern'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-navy">
      <BlueprintPattern fixed />

      <div className="relative z-10">
        <KottuMachine />
        <SpecsSection />
        <WhyChooseUs />
        <YoutubeDemoSection />
        <FAQSection />
        <SocialProof />
        <FeedbackVideoSection />
        <StatsSection />
        <HowItWorks />
        <ContactSection />
        <VideoModal isOpen={true} onClose={() => {}} autoPlay={true} />
        <footer className="relative px-4 pb-28 pt-0 text-center sm:pb-24">
          <p className="font-english text-sm text-white/45">
            © 2026 HDB Engineering Lanka (Pvt) Ltd
          </p>
        </footer>
      </div>

      <FloatingCallButton />
      <StickyCTABar />
    </main>
  )
}
