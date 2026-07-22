import { Quote } from 'lucide-react'
import Reveal from './Reveal'

// TODO: replace with a real customer quote, name, and town before launch.
export default function Testimonial() {
  return (
    <section className="py-16 px-4 bg-charcoal">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl bg-white/5 border border-dashed border-white/20 p-8 text-center">
            <Quote className="w-8 h-8 text-flame-amber mx-auto mb-4" aria-hidden />
            <p className="text-gray-300 text-lg italic leading-relaxed mb-6">
              &ldquo;TODO: real customer quote goes here — what changed for their shop after buying the machine.&rdquo;
            </p>
            <p className="text-flame-amber text-sm font-bold">TODO: Customer name — Town</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
