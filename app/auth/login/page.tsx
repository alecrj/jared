'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import NavScrollHandler from '../../components/NavScrollHandler'
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  User,
  ArrowRight
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<'user' | 'host'>('user')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, redirect to homepage
    window.location.href = '/'
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
              background: 'var(--color-accent-gradient)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-xl)',
              boxShadow: 'var(--shadow-large)',
              backdropFilter: 'var(--blur-sm)',
              WebkitBackdropFilter: 'var(--blur-sm)'
            }}>
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 style={{
              fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-4xl))',
              fontWeight: '700',
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-sm)',
              letterSpacing: '-0.03em',
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Welcome Back
            </h1>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-neutral-600)',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Sign in to your Conquistador account
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
            {/* User Type Selection */}
            <div style={{ marginBottom: 'var(--space-2xl)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-md)',
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Account Type
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  style={{
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${userType === 'user' ? 'var(--color-accent)' : 'rgba(29, 29, 31, 0.08)'}`,
                    background: userType === 'user' ? 'rgba(0, 122, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)',
                    color: userType === 'user' ? 'var(--color-accent)' : 'var(--color-neutral-600)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.5s var(--ease-out-expo)',
                    backdropFilter: 'var(--blur-sm)',
                    WebkitBackdropFilter: 'var(--blur-sm)',
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <User className="w-4 h-4" />
                  Traveler
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('host')}
                  style={{
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${userType === 'host' ? 'var(--color-accent)' : 'rgba(29, 29, 31, 0.08)'}`,
                    background: userType === 'host' ? 'rgba(0, 122, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)',
                    color: userType === 'host' ? 'var(--color-accent)' : 'var(--color-neutral-600)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.5s var(--ease-out-expo)',
                    backdropFilter: 'var(--blur-sm)',
                    WebkitBackdropFilter: 'var(--blur-sm)',
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <Users className="w-4 h-4" />
                  Host
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--space-sm)',
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 'var(--space-md) var(--space-lg) var(--space-md) 44px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(29, 29, 31, 0.12)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'var(--blur-sm)',
                      WebkitBackdropFilter: 'var(--blur-sm)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-primary)',
                      transition: 'all 0.5s var(--ease-out-expo)',
                      outline: 'none',
                      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                    placeholder="your@email.com"
                    required
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.08)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(29, 29, 31, 0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--space-sm)',
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 'var(--space-md) 48px var(--space-md) 44px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(29, 29, 31, 0.12)',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'var(--blur-sm)',
                      WebkitBackdropFilter: 'var(--blur-sm)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-primary)',
                      transition: 'all 0.5s var(--ease-out-expo)',
                      outline: 'none',
                      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                    placeholder="Enter your password"
                    required
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.08)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(29, 29, 31, 0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 'var(--space-md)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-neutral-400)',
                      cursor: 'pointer',
                      padding: 'var(--space-xs)',
                      borderRadius: 'var(--radius-xs)',
                      transition: 'all 0.3s var(--ease-out-expo)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-neutral-600)'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-neutral-400)'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                    }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="remember-me"
                    type="checkbox"
                    style={{
                      marginRight: 'var(--space-sm)',
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--color-accent)'
                    }}
                  />
                  <label htmlFor="remember-me" style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-600)',
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}>
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  transition: 'all 0.3s var(--ease-out-expo)',
                  fontWeight: '500',
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                  e.currentTarget.style.transform = 'translateX(2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 'var(--space-sm)'
                }}
              >
                {isLoading ? `Signing in as ${userType}...` : `Sign In as ${userType === 'user' ? 'Traveler' : 'Host'}`}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
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
                Don't have an account?{' '}
                <Link href="/auth/register" style={{
                  fontWeight: '600',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                  transition: 'all 0.3s var(--ease-out-expo)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                  e.currentTarget.style.transform = 'translateX(2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}