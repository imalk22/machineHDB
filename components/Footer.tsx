import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <p className="text-white font-bold text-base">HDB Engineering Lanka (Pvt) Ltd</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-gray-400 text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden />
            No. 218, Kurunegala Road, Dambulla, Sri Lanka
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 flex-shrink-0" aria-hidden />
            076 0 360 560 / 076 0 450 451
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 flex-shrink-0" aria-hidden />
            hdbengineeringlanka@gmail.com
          </span>
        </div>

        <p className="text-gray-600 text-xs pt-2">
          &copy; {new Date().getFullYear()} HDB Engineering Lanka (Pvt) Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
