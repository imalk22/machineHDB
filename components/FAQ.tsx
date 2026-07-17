'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    a: 'ඕඩරය තහවුරු වූ පසු දින 3-7ක් තුළ දිවයින පුරා නොමිලේ බෙදාහැරීම සිදු කරයි.',
  },
  {
    q: 'විදුලි බලය කොපමණ ප්‍රමාණයක් අවශ්‍යද?',
    a: '1.5 HP (1500W) සාමාන්‍ය ගෘහස්ථ/වාණිජ විදුලි සැපයුමක් ප්‍රමාණවත් වේ. විශේෂ වයරින් අවශ්‍ය නොවේ.',
  },
]

const trustBadges = [
  { icon: '📋', label: 'Legal Agreement' },
  { icon: '🏭', label: 'Showroom Demo' },
  { icon: '🚚', label: 'Islandwide Delivery' },
  { icon: '🔧', label: 'Technical Support' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-ice py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight">නිතර අසන ප්‍රශ්ණ (FAQ)</h2>
        </motion.div>

        <div className="space-y-3 mb-8">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={item.q}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-navy text-sm leading-snug">{item.q}</span>
                  </div>
                  <motion.span
                    className="flex-shrink-0 text-navy"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▾
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
                      <p className="px-5 pb-5 pl-15 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 220, damping: 20 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mx-auto mb-2 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-navy flex items-center justify-center shadow-md shadow-blue-900/25 text-2xl sm:text-3xl"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.08 + 0.1, type: 'spring', stiffness: 300, damping: 14 }}
                viewport={{ once: true }}
              >
                {badge.icon}
              </motion.div>
              <div className="text-xs font-semibold text-navy">{badge.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-navy rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white text-xl sm:text-2xl font-extrabold mb-4">තවත් ප්‍රශ්ණ තිබෙනවාද?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-center leading-snug bg-whatsapp hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm sm:text-base"
            >
              WhatsApp හරහා නොමිලේ උපදෙස්
              <br />
              ලබාගන්න
            </a>
            <a
              href="tel:+94760360560"
              className="flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              📞 Call Now — 076 0 360 560
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
