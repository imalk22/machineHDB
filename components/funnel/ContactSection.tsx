'use client'

import { Phone, MapPin } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, LOCATION } from '@/lib/contact'

export default function ContactSection() {
  return (
    <section className="relative bg-transparent px-4 py-8 sm:py-10">
      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold text-white sm:text-3xl">
            අපිව අමතන්න
          </h2>
          <p className="font-english mt-2 text-center text-base text-white/70">
            Contact us today
          </p>
        </Reveal>

        <div className="mt-6 space-y-4">
          <Reveal delayMs={80}>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-brand-cta/40 bg-brand-cta/15 p-5 backdrop-blur-sm transition-colors hover:bg-brand-cta/25"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cta text-white">
                <Phone className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="font-english text-sm font-medium text-white/60">Phone</p>
                <p className="btn-english text-xl text-white">{PHONE_DISPLAY}</p>
              </div>
            </a>
          </Reveal>

          <Reveal delayMs={160}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-whatsapp/40 bg-whatsapp/15 p-5 backdrop-blur-sm transition-colors hover:bg-whatsapp/25"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.875L0 24l6.335-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.012-1.379l-.361-.214-3.746.897.941-3.636-.235-.375A9.807 9.807 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
              </div>
              <div>
                <p className="font-english text-sm font-medium text-white/60">WhatsApp</p>
                <p className="btn-english text-xl text-white">Message us now</p>
              </div>
            </a>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <MapPin className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="font-english text-sm font-medium text-white/60">Location</p>
                <p className="text-lg font-bold text-white">දඹුල්ල — Dambulla</p>
                <p className="font-english mt-1 text-sm text-white/70">{LOCATION}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
