'use client'

import { useEffect } from 'react'

export default function NavScrollHandler() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.nav')
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('nav-scrolled')
        } else {
          nav.classList.remove('nav-scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}