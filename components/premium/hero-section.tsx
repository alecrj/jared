'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container-premium text-center text-white">
          {/* Hero Text */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-display-xl mb-6">
              Unique experiences.
              <br />
              <span className="text-white/90">Led by locals.</span>
            </h1>
            <p className="text-body-xl text-white/80 max-w-2xl mx-auto">
              Join group adventures or create your own experiences for fellow travelers to discover
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <div className="flex-1 px-6 py-4">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none text-lg"
                  />
                </div>
                <button className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-200">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/conquistatour" className="btn btn-primary btn-lg">
              Browse experiences
            </Link>
            <Link href="/leader/apply" className="btn btn-secondary btn-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
              Create experience
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  )
}