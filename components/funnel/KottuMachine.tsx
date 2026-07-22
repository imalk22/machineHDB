'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact'

const productImages = [
  '/images/kottu-1.jpg',
  '/images/kottu-2.jpg',
  '/images/kottu-3.jpg',
  '/images/kottu-4.jpg',
  '/images/kottu-5.jpg',
  '/images/kottu-6.jpg',
]

const uses = [
  'Hotels & restaurants',
  'Catering services',
  'Food courts',
]

const boxPhotos = [
  '/images/display/machinedis-1.png',
  '/images/display/machinedis-2.png',
  '/images/display/machinedis-3.png',
  '/images/display/machinedis-4.png',
]

export default function KottuMachine() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i === 0 ? productImages.length - 1 : i - 1))
  const next = () => setActive((i) => (i === productImages.length - 1 ? 0 : i + 1))

  return (
    <section className="relative bg-transparent px-4 py-12 sm:py-16">
      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <h2 className="font-english text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Commercial Kottu Cutting Machine
          </h2>
          <p className="mt-3 text-center text-xl font-bold text-white/90 sm:text-2xl">
            කොත්තු කැපිමේ යන්ත්‍රය
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mt-8">
          <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
            <div className="relative mx-auto h-[300px] w-full sm:h-[360px]">
              <Image
                src={productImages[active]}
                alt={`Commercial Kottu Cutting Machine ${active + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 576px"
                priority={active === 0}
              />
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-3 pb-3">
              {productImages.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    active === index ? 'border-brand-cta' : 'border-white/20 opacity-70'
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>

            <div className="relative px-5 pb-6 pt-6 sm:px-6">
              <div className="relative pt-2">
                <motion.div
                  className="absolute -top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-base font-extrabold text-white shadow-lg shadow-orange/50 sm:text-lg"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  10% OFF
                </motion.div>

                <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 pt-5">
                  <div className="h-[2px] bg-gradient-to-r from-orange via-whatsapp to-electric" />
                  <div className="px-4 pb-4 pt-4 sm:px-5">
                    <p className="font-english text-center text-sm font-semibold uppercase tracking-wide text-white/60">
                      Special Offer
                    </p>

                    <div className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
                      <p className="text-lg text-white/40 line-through">රු. 99,500</p>
                      <p className="text-3xl font-extrabold text-brand-cta">රු. 89,550</p>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <motion.span
                        className="inline-block rounded-full bg-whatsapp px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-whatsapp/40"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        රු. 9,950 ඉතිරි කරගන්න
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-sm leading-relaxed text-white/85 sm:text-[15px]">
                ඔයාගේ Restaurant එකට Catering service එකට සහ hotel එකට ගැලපෙන අත්‍යවශ්‍ය
                machine එකක් තමයි Kottu Cutting Machine එක - මේ Machine එකෙන් වේගවත්ව සහ ඉක්මනට කොත්තු රොටී
                කපගන්න හැකියාව තියෙනවා වගේම ඔයගේ Business එකත් බලන් ඉද්දිම Grow වෙනවා
              </p>

              <ul className="mt-4 space-y-2">
                {uses.map((use) => (
                  <li
                    key={use}
                    className="font-english flex items-center gap-2 text-sm font-medium text-white/90"
                  >
                    <span className="text-brand-cta">✔</span>
                    {use}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-start">
                <span className="font-english rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
                  1 year warranty
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {boxPhotos.map((src, index) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-xl border border-white/15 bg-black/30"
                  >
                    <Image
                      src={src}
                      alt={`Product photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, 280px"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="btn-english flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-cta/40 bg-brand-cta/20 px-5 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-brand-cta/30"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cta text-white">
                    <Phone className="h-5 w-5 flex-shrink-0" aria-hidden />
                  </span>
                  Call Now: {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
