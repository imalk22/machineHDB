'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Background animations */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          තිබුණ අවස්ථා අතුරු - ක්ෂණිකයි!
        </motion.h2>

        <motion.p
          className="text-2xl text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          අපිට ඉතිරිවුනේ යන්ත්‍රය 3කි පමණ - දැන්ම සම්බන්ධ වන්න
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => window.location.href = 'tel:+94760360560'}
            className="px-10 py-5 bg-gradient-to-r from-accent to-red-600 text-white font-bold rounded-full text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(255, 107, 107, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">📞</span>
            දැන්ම අමතන්න
          </motion.button>

          <motion.button
            onClick={() => {
              const message = encodeURIComponent('Hello, I am interested in the Kottu Cutting Machine. Please send me more details.')
              window.open(`https://wa.me/94760360560?text=${message}`, '_blank')
            }}
            className="px-10 py-5 bg-white bg-opacity-20 text-white font-bold rounded-full text-lg hover:bg-opacity-30 border-2 border-white transition-all flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">💬</span>
            WhatsApp පිටින් අසන්න
          </motion.button>

          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="px-10 py-5 bg-transparent text-white font-bold rounded-full text-lg border-2 border-white hover:bg-white hover:text-primary transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">🎬</span>
            වීඩියෝ නැවත බලන්න
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">24/7</div>
            <p className="text-gray-300">Customer Support</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <p className="text-gray-300">සිරි ලංකා ගෙවීම</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">1yr</div>
            <p className="text-gray-300">Full Warranty</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
