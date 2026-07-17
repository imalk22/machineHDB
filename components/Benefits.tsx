'use client'

import { motion } from 'framer-motion'

const benefitSections = [
  {
    title: '🚀 වේගයෙන් නඩත්තු කරන්න',
    description: 'තිරෙ දිනේ තුනේ (3) වරට දීමනා වැඩි කරන්න. ඔබගේ ගිණුමේ තුනේ (3) වරට වැඩිවෙයි।',
    points: [
      'දීමනා දිනට 50 ➜ දිනට 150',
      'තිරෙ කරන්නගේ 2-3 ➜ එක්ගේ 1',
      'පැය 12 ➜ පැය 4 වැඩ',
    ],
    emoji: '📈',
  },
  {
    title: '💰 ශ්‍රමිකයින්ගේ වියඩු අඩු කරන්න',
    description: 'එක්ගේ 1 කමක් තිරෙ පුරා කරන්න පුළුවන්. සිරිපිටි ලිපිනේ 50% අඩු කරන්න.',
    points: [
      'ශ්‍රමිකයින් 2 ➜ ශ්‍රමිකයින් 1',
      'නිල පිටි සම්පූර්ණ අඩු',
      'මාසයකට ලක්ෂ ගණන ඉතිරි',
    ],
    emoji: '💼',
  },
  {
    title: '⭐ ගුණයිතුරු ඉතිරිකරුණ',
    description: 'සෑම කෑල්ලම සමාන විශාලත්වයි. ගිණුමෙ සඳහා නිවැරැදි විසඳුමයි.',
    points: [
      'ඒකාකාර කෑල්ල - සෑම අවස්ථාවේ',
      'අසිරි වැඩ - ඉතිරිකරුණු ඉතිරි',
      'සතුටුවත් ගිණුම - නැවත දීමනා',
    ],
    emoji: '✨',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ඔබ දරන්න ඔබ ලබන්න
          </h2>
          <p className="text-xl text-gray-600">
            ඔබගේ ව්‍යාපාරය පිට වෙනසක් සිදු වෙයි
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="space-y-20">
          {benefitSections.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col lg:flex-row gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Text Content */}
              <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <h3 className="text-3xl font-bold text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-3">
                  {benefit.points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-gray-700 text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-accent text-2xl font-bold">✓</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Image/Illustration */}
              <motion.div
                className={`flex-1 h-80 rounded-2xl bg-gradient-to-br from-accent to-red-600 flex items-center justify-center text-white font-bold text-center p-8 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
                whileInView={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl">{benefit.emoji}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
