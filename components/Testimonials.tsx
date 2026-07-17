'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    text: 'ඒ යන්ත්‍රය එනිමතින් ඉතිරිකරුණු තිබුණ. දිනට දීමනා 30 සිට 100 වෙනවා. ශ්‍රමිකයින් එක්ගේ 1 දැන්. ලඟ දිනක උත්තර දිනිසමට සිරි ලංකා කි වෙනවා.',
    author: 'කුරුණෑගල කෝටු කඩය',
    role: 'කුරුණෑගල, ශ්‍රී ලංකා',
    rating: 5,
  },
  {
    text: 'අපි සිතුවෙ සිටිපුවෙ එම්බ වසර 2 ක්. අතුරු පහසුයි. නැතිවුනොත් අපිට ශ්‍රමිකයින් පහ දෙනාට සරු බැරි කරන්නයි.',
    author: 'කොලඹ විශාල සෝටෙල්',
    role: 'කොලඹ 6, ශ්‍රී ලංකා',
    rating: 5,
  },
  {
    text: 'එක දිනක සිතුවෙ ගිණුම ගිණුම සිතුවෙ. යම්දු වරකට නිල ලිපිනේ ඒ තැනටම ඉතිරිකරුණු ඉතිරිවෙයි.',
    author: 'ගාල්ල ඉතිරිකරුණු ගමණ',
    role: 'ගාල්ල, ශ්‍රී ලංකා',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ඉන්ගේ සිතුවිලි
          </h2>
          <p className="text-xl text-gray-600">
            ශ්‍රී ලංකා පුරා භාවිතා කරන වෙළෙන්දන්ගේ අත්දැකීම
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-l-4 border-accent transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
