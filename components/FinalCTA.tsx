import { Phone } from 'lucide-react'
import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="relative py-20 px-4 bg-charcoal overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[400px] bg-flame/15 rounded-full blur-[100px]"
        aria-hidden
      />

      <Reveal className="relative max-w-lg mx-auto text-center">
        <h2 className="gradient-text-flame animate-gradient-shift text-3xl sm:text-4xl font-black leading-tight mb-4">
          අදම ඔබේ කෝටු කඩය වේගවත් කරගන්න
        </h2>
        <p className="text-gray-300 text-base leading-relaxed mb-8">
          විස්තර දැනගැනීමට හෝ Pre-Order කිරීමට දැන්ම අප අමතන්න.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/94760360560?text=Hi%20HDB%20Engineering%20Lanka%2C%20I%27m%20interested%20in%20the%20Commercial%20Kottu%20Cutting%20Machine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-500 text-white font-bold py-4 px-6 rounded-2xl text-base transition-colors shadow-lg animate-pulse-glow-flame cursor-pointer"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.875L0 24l6.335-1.517A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.012-1.379l-.361-.214-3.746.897.941-3.636-.235-.375A9.807 9.807 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            WhatsApp හරහා Pre-Order කරන්න
          </a>
          <a
            href="tel:+94760360560"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold py-4 px-6 rounded-2xl text-base transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5 flex-shrink-0" aria-hidden />
            Call Now: 076 0 360 560
          </a>
        </div>
      </Reveal>
    </section>
  )
}
