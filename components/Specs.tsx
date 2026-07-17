'use client'

import { motion } from 'framer-motion'

const specs = [
  { label: 'Power', value: '1.5 HP (1500W)' },
  { label: 'Capacity', value: '150 kg/hour' },
  { label: 'Material', value: 'SS304 Stainless Steel' },
  { label: 'Warranty', value: '1 Year (Parts & Service)' },
  { label: 'Origin', value: 'Made in Sri Lanka' },
]

const features = [
  {
    en: 'Rapid slicing for kottu and noodles',
    si: 'කොත්තු සහ නූඩ්ල්ස් සඳහා වේගවත් කැපීම',
  },
  {
    en: 'Cuts meat, cheese, and vegetables uniformly',
    si: 'මස්, චීස් සහ එළවලු සමාන ලෙස කපයි',
  },
  {
    en: 'Single operator needed',
    si: 'එක් ක්‍රියාකරුවෙකු පමණක් ප්‍රමාණවත්',
  },
  {
    en: 'SS304 commercial-grade stainless steel',
    si: 'SS304 වාණිජ ශ්‍රේණියේ මල නොබැඳෙන වානේ',
  },
  {
    en: 'Free island-wide delivery and installation',
    si: 'දිවයින පුරා නොමිලේ බෙදාහැරීම සහ ස්ථාපනය',
  },
]

export default function Specs() {
  return (
    <section id="specs" className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-navy/10 text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            🔩 Technical Specifications
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy leading-tight">
            තාක්ෂණික විස්තර සහ වගකිම් සහතිකය
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Spec table */}
          <motion.div
            className="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <table className="w-full text-sm">
              <tbody>
                {specs.map((spec, index) => (
                  <tr key={spec.label} className={index % 2 === 0 ? 'bg-ice' : 'bg-white'}>
                    <td className="px-4 py-3 text-gray-600 text-xs w-1/2 border-r border-gray-200">{spec.label}</td>
                    <td className="px-4 py-3 text-navy font-semibold text-xs">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Warranty + key features */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="bg-whatsapp/10 border border-whatsapp/30 rounded-2xl p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-whatsapp text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-center flex-shrink-0">
                <span className="font-extrabold text-lg leading-none">1</span>
                <span className="text-xs leading-none">Year</span>
              </div>
              <div>
                <p className="font-bold text-navy text-sm">යන්ත්‍රයේ බඳ සඳහා වගකීම</p>
                <p className="text-xs text-gray-500">Machine Warranty (Parts &amp; Service)</p>
              </div>
            </motion.div>

            <div className="space-y-2.5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.en}
                  className="group relative flex items-center gap-3 bg-ice hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-xl p-3 overflow-hidden transition-colors duration-300"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ delay: 0.15 + index * 0.12, type: 'spring', stiffness: 260, damping: 20 }}
                  viewport={{ once: true }}
                >
                  {/* one-shot shine sweep as the card lands */}
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                    initial={{ x: '-40%' }}
                    whileInView={{ x: '450%' }}
                    transition={{ delay: 0.15 + index * 0.12 + 0.35, duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />

                  <motion.div
                    className="relative flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shadow-green-700/20 group-hover:scale-110 transition-transform duration-300"
                    initial={{ scale: 0, rotate: -120 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15 + index * 0.12 + 0.1, type: 'spring', stiffness: 320, damping: 14 }}
                    viewport={{ once: true }}
                  >
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ delay: 0.15 + index * 0.12 + 0.35, duration: 0.35, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </svg>
                  </motion.div>
                  <div className="relative">
                    <p className="text-navy text-xs font-semibold leading-snug">{feature.si}</p>
                    <p className="text-gray-500 text-[11px] leading-snug mt-0.5">{feature.en}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
