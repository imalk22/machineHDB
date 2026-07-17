'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const checklist = [
  'නිල නීතිමය ගිවිසුමක් (Legal Agreement)',
  'Free Delivery Island-wide',
  'Free Installation & Setup',
  'Free Training',
]

export default function Pricing() {
  return (
    <section className="bg-gradient-to-br from-navy via-primary to-navy py-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-primary to-navy p-6 sm:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Product image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-6">
            <Image
              src="/images/kottu-cutting-machine.png"
              alt="Commercial Kottu Cutting Machine"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>

          <span className="inline-block text-electric text-xs font-bold tracking-[0.2em] uppercase mb-3">
            විශේෂ ප්‍රී-ඕඩර් මිල
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-tight">
            Commercial Kottu Cutting Machine
          </h3>

          <div className="mb-6">
            <p className="text-white/40 text-sm line-through mb-1">රු. 124,375</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-orange leading-none mb-2">🔥 රු. 99,500</p>
            <motion.span
              className="inline-block bg-whatsapp text-white text-sm font-bold px-4 py-1.5 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              රු. 24,875 ඉතිරි කරගන්න
            </motion.span>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <a
              href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine.%20Please%20provide%20more%20details%20and%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 whitespace-nowrap bg-whatsapp hover:bg-green-500 text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-colors"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.875L0 24l6.335-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.012-1.379l-.361-.214-3.746.897.941-3.636-.235-.375A9.807 9.807 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              <span>WhatsApp හරහා Pre-Order කරන්න</span>
            </a>
            <a
              href="tel:+94760360560"
              className="flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-4 px-6 rounded-2xl text-base transition-colors"
            >
              📞 Call Now: 076 0 360 560
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 mb-4">
            {checklist.map((item) => (
              <span key={item} className="flex items-center gap-1 text-xs text-white/70">
                <span className="text-whatsapp">✅</span>
                {item}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1">
            <p className="text-xs text-white/40">⚠️ සීමිත යන්ත්‍ර ප්‍රමාණයක් පමණක් Order කර ගත හැකිය.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
