'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  onVideoClick: () => void
}

export default function Hero({ onVideoClick }: HeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden flex items-center justify-center pt-20 px-4">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Content */}
      <motion.div
        className="z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Professional Kottu Cutting Machine
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-accent font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          වේගයෙන් කපන්න | ගුණමාන සහ ඉතිරිකරුණ
        </motion.p>

        <motion.p
          className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ඔබගේ ව්‍යාපාරය ද්‍රුතවත් කරන්න සහ මාසයකට දීමනා වැඩි කරන්න. මේ පිටුවේ දිස්ටිමු වීඩියෝ බලා ඔබ කෝණිසි වුන නම් ඉතුරුව අතුරු ස්ථරවලින් අතිරේක විස්තර බලන්න.
        </motion.p>

        <motion.button
          onClick={onVideoClick}
          className="px-10 py-4 bg-gradient-to-r from-accent to-red-600 text-white font-bold rounded-full text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">🎬</span>
          වීඩියෝ බලන්න
        </motion.button>

        <motion.div
          className="mt-12 flex justify-center gap-8 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div>
            <div className="text-3xl font-bold text-accent">500+</div>
            <div>Machines Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">5000+</div>
            <div>Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent">10+</div>
            <div>Years Experience</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
