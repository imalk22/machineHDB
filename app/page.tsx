'use client'

import dynamic from 'next/dynamic'
import KottuMachine from '@/components/funnel/KottuMachine'
import SpecsSection from '@/components/funnel/SpecsSection'
import WhyChooseUs from '@/components/funnel/WhyChooseUs'
import StickyCTABar from '@/components/StickyCTABar'
import FloatingCallButton from '@/components/funnel/FloatingCallButton'
import BlueprintPattern from '@/components/BlueprintPattern'

const YoutubeDemoSection = dynamic(() => import('@/components/funnel/YoutubeDemoSection'), {
  loading: () => <SectionSkeleton tall />,
})
const FAQSection = dynamic(() => import('@/components/funnel/FAQSection'), {
  loading: () => <SectionSkeleton />,
})
const SocialProof = dynamic(() => import('@/components/funnel/SocialProof'), {
  loading: () => <SectionSkeleton />,
})
const FeedbackVideoSection = dynamic(() => import('@/components/funnel/FeedbackVideoSection'), {
  loading: () => <SectionSkeleton tall />,
})
const StatsSection = dynamic(() => import('@/components/funnel/StatsSection'), {
  loading: () => <SectionSkeleton />,
})
const HowItWorks = dynamic(() => import('@/components/funnel/HowItWorks'), {
  loading: () => <SectionSkeleton />,
})
const ContactSection = dynamic(() => import('@/components/funnel/ContactSection'), {
  loading: () => <SectionSkeleton />,
})
const LastYoutubeVideoSection = dynamic(
  () => import('@/components/funnel/LastYoutubeVideoSection'),
  { loading: () => <SectionSkeleton tall /> }
)

function SectionSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`mx-auto max-w-lg animate-pulse px-4 py-8 ${tall ? 'min-h-[280px]' : 'min-h-[120px]'}`}
      aria-hidden
    >
      <div className="mx-auto mb-4 h-6 w-3/4 rounded bg-white/10" />
      <div className={`rounded-2xl bg-white/5 ${tall ? 'aspect-video' : 'h-24'}`} />
    </div>
  )
}

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
        <LastYoutubeVideoSection />
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
