'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Conquistador
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/conquistatour" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
              Experiences
            </Link>
            <Link href="/leader/apply" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
              Host an experience
            </Link>
            
            {/* User Menu */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-full p-1 hover:shadow-md transition-all duration-200">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Menu className="w-4 h-4 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <User className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              <Link
                href="/conquistatour"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium transition-colors duration-200 rounded-xl mx-2"
                onClick={() => setIsOpen(false)}
              >
                Experiences
              </Link>
              <Link
                href="/leader/apply"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium transition-colors duration-200 rounded-xl mx-2"
                onClick={() => setIsOpen(false)}
              >
                Host an experience
              </Link>
              <div className="border-t border-gray-200 mt-4 pt-4 px-4 space-y-3">
                <Link href="/auth/login" className="btn btn-ghost btn-md w-full justify-start" onClick={() => setIsOpen(false)}>
                  Sign in
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-md w-full" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}