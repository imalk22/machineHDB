'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Reveal from '@/components/Reveal'

const faqs = [
  {
    q: 'ප්‍රී-ඕඩර් එකක් ස්ථිර කරන්නේ කොහොමද?',
    a: 'WhatsApp හෝ Call එකක් හරහා අප අමතන්න. Advance මුදලක් සහ ලිපිනය ලබා දීමෙන් ඔබේ ඕඩරය ස්ථිර කරගත හැක.',
  },
  {
    q: 'Warranty සහ After-Sales සේවාව ලබෙන්නේ කොහොමද?',
    a: 'මාස 12ක පූර්ණ වගකීමක් සමගින් යන්ත්‍රය ලබා දේ. ගැටළුවක් ඇතිවුවහොත් අපගේ දිවයින පුරා සේවා කණ්ඩායම ඔබ වෙත පැමිණේ.',
  },
  {
    q: 'බෙදාහැරීම කොපමණ කාලයක් ගතවෙයිද?',
    a: 'ඕඩරය තහවුරු වූ පසු දින 3-7ක් තුළ දිවයින පුරා බෙදාහැරීම සිදු කරයි.',
  },
  {
    q: 'විදුලි බලය කොපමණ ප්‍රමාණයක් අවශ්‍යද?',
    a: '1.5 HP (1500W) සාමාන්‍ය ගෘහස්ථ/වාණිජ විදුලි සැපයුමක් ප්‍රමාණවත් වේ. විශේෂ වයරින් අවශ්‍ය නොවේ.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal className="mb-5 text-center">
          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            නිතර අසන ප්‍රශ්ණ (FAQ)
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <Reveal
                key={item.q}
                delayMs={index * 60}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm"
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-white/10 sm:p-5"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-cta text-xs font-bold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold leading-snug text-white">
                      {item.q}
                    </span>
                  </div>
                  <motion.span
                    className="flex-shrink-0 text-brand-cta"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 pl-14 text-sm font-medium leading-relaxed text-white/85 sm:px-5 sm:pb-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
