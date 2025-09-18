'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import NavScrollHandler from '../../components/NavScrollHandler'
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Users,
  Phone,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'user' | 'host'>('user')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setRegistered(true)
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (registered) {
    return (
      <>
        <NavScrollHandler />
        
        {/* Modern Navigation */}
        <nav className="nav">
          <div className="container">
            <div className="nav-content">
              <Link href="/" className="logo">
                Conquistador
              </Link>
              <div className="nav-links">
                <Link href="/conquistatour">Experiences</Link>
                <Link href="/leader/apply">Host</Link>
                <Link href="/auth/login">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-screen" style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '120px 1rem 2rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px) saturate(150%)',
              borderRadius: '20px',
              padding: '3rem',
              border: '1px solid rgba(15, 20, 25, 0.1)',
              boxShadow: 'var(--shadow-xl)',
              maxWidth: '500px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--color-primary)',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                Welcome to Conquistador!
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--color-neutral-600)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Your {userType === 'user' ? 'traveler' : 'host'} account has been created successfully. 
                Check your email for verification instructions.
              </p>
              <Link href="/auth/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Sign In to Your Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavScrollHandler />

      {/* Modern Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              Conquistador
            </Link>
            <div className="nav-links">
              <Link href="/conquistatour">Experiences</Link>
              <Link href="/leader/apply">Host</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen" style={{
        background: 'var(--color-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5xl) var(--space-lg) var(--space-2xl)'
      }}>
        <div style={{ maxWidth: '480px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <div style={{
              width: '72px',
              height: '72px',
              background: 'var(--color-brand-gradient)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-xl)',
              boxShadow: 'var(--shadow-large)',
              backdropFilter: 'var(--blur-sm)',
              WebkitBackdropFilter: 'var(--blur-sm)'
            }}>
              <Users className="w-7 h-7 text-white" />
            </div>
            <h1 style={{
              fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-4xl))',
              fontWeight: '700',
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-sm)',
              letterSpacing: '-0.03em',
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Join the Adventure
            </h1>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-neutral-600)',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Create your account and discover amazing experiences
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'var(--blur-backdrop)',
            WebkitBackdropFilter: 'var(--blur-backdrop)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            border: '1px solid rgba(29, 29, 31, 0.08)',
            boxShadow: 'var(--shadow-extra-large)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-600)',
                textAlign: 'center'
              }}>
                Registration temporarily disabled for demo
              </p>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={true}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: '0.5',
                  cursor: 'not-allowed'
                }}
              >
                Create Account (Demo)
              </button>
            </form>

            <div style={{
              marginTop: 'var(--space-2xl)',
              paddingTop: 'var(--space-xl)',
              borderTop: '1px solid rgba(29, 29, 31, 0.08)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-600)',
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  transition: 'all 0.3s var(--ease-out-expo)'
                }}>
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}