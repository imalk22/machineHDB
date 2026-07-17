'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    icon: '🏛',
    title: 'නිල ලියාපදිංචි ආයතනය',
    desc: 'නිත්‍යනුකුල ලියාපදිංචි ආයතනයකි.',
    subtitle: 'Official Company Registration',
  },
  {
    icon: '📋',
    title: 'නිල නීතිමය ගිවිසුමක්',
    desc: 'Advance මුදලට නිල ගිවිසුමක් ලබා දේ.',
    subtitle: 'Legal Agreement Issued',
  },
  {
    icon: '🏭',
    title: 'දඹුල්ල Showroom',
    desc: 'Dambulla Showroom හිදී Machine Live Demo.',
    subtitle: 'Physical Showroom — Dambulla',
  },
  {
    icon: '🏦',
    title: 'ආරක්ෂිත බැංකු ගෙවීම්',
    desc: 'ආරක්ෂිත බැංකු ගෙවීම් ක්‍රම.',
    subtitle: 'Secure Bank Payments',
  },
  {
    icon: '🛡',
    title: 'මාස 12 වගකිම් කාලය',
    desc: 'යන්ත්‍රයේ බඳ සඳහා මාස 12ක පූර්ණ වගකිම.',
    subtitle: '12-Month Warranty Support',
  },
  {
    icon: '👨‍🔧',
    title: 'දිවයින පුරා සේවා කණ්ඩායම',
    desc: 'දිවයින පුරා ක්ෂේත්‍ර සේවා කණ්ඩායමක් ඇත.',
    subtitle: 'Island-wide Expert Service Team',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-16 px-4 bg-navy">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            ඇයි HDB Engineering Lanka තෝරාගත යුත්තේ?
          </h2>
          <span className="inline-flex items-center gap-2 bg-white/10 text-white font-bold text-sm px-4 py-2 rounded-full border border-white/20">
            🔒 ඔබේ මුදල 100%ක් ආරක්ෂිතයි
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="group bg-white/8 backdrop-blur-sm rounded-2xl p-5 border border-white/12 hover:bg-white/15 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-7 h-7 bg-orange text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{reason.icon}</span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{reason.title}</h3>
              <p className="text-xs text-blue-200 font-semibold leading-relaxed">{reason.desc}</p>
              <p className="text-xs text-blue-300/50 mt-1">{reason.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
