import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import NavScrollHandler from './components/NavScrollHandler'

const prisma = new PrismaClient()

export default async function Home() {
  const featuredTours = await prisma.conquistaTour.findMany({
    where: {
      status: 'LIVE',
      featuredOrder: { not: null }
    },
    include: {
      leader: {
        include: {
          profile: true
        }
      }
    },
    orderBy: {
      featuredOrder: 'asc'
    },
    take: 4
  })

  // Premium experiences with updated pricing to match experience pages
  const experiences = [
    {
      id: 'hidden-rome-walking-tour',
      title: 'Roman Heritage & Culinary Discovery',
      location: 'Rome, Italy',
      price: 1295,
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'tokyo-street-photography-experience',
      title: 'Tokyo Cultural Immersion & Photography',
      location: 'Tokyo, Japan',
      price: 1685,
      duration: '4 days',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'barcelona-architecture-tour',
      title: 'Barcelona Architecture & Catalan Culture',
      location: 'Barcelona, Spain',
      price: 1195,
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'croatia-culinary-conquest-taste-of-the-adriatic',
      title: 'Croatia Culinary Conquest',
      location: 'Croatia',
      price: 3450,
      duration: '10 days',
      image: '/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg'
    }
  ]

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
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Premium cultural journeys.<br/>Led by local experts.</h1>
            <p>Discover multi-day adventures that immerse you in authentic local culture, cuisine, and hidden treasures around the world</p>
            
            <div className="search-bar">
              <input type="text" placeholder="Where do you want to go?" />
              <button className="search-btn">Search</button>
            </div>
            
            <div className="btn-group">
              <Link href="/conquistatour" className="btn btn-primary">Browse experiences</Link>
              <Link href="/leader/apply" className="btn btn-secondary">Create experience</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section section-featured">
        <div className="container">
          <h2>Featured premium journeys</h2>
          <p>Immerse yourself in multi-day cultural adventures with expert local guides and authentic experiences</p>
          
          <div className="cards">
            {experiences.map((experience) => (
              <Link key={experience.id} href={`/conquistatour/${experience.id}`} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <img src={experience.image} alt={experience.title} />
                  <div className="card-content">
                    <h3>{experience.title}</h3>
                    <p>{experience.location} · {experience.duration}</p>
                    <div className="price">${experience.price.toLocaleString()} per person</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/conquistatour" className="btn btn-primary">View all experiences</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-features">
        <div className="container">
          <h2>Why choose Conquistador?</h2>
          <p>Connect with passionate locals and discover authentic experiences beyond the ordinary</p>
          
          <div className="features">
            <div className="feature">
              <div className="feature-icon"></div>
              <h3>Local guides</h3>
              <p>Connect with passionate locals who create unique, authentic experiences</p>
            </div>
            <div className="feature">
              <div className="feature-icon"></div>
              <h3>Authentic adventures</h3>
              <p>Go beyond tourist spots to discover genuine local culture and hidden gems</p>
            </div>
            <div className="feature">
              <div className="feature-icon"></div>
              <h3>Trusted platform</h3>
              <p>Every experience is carefully vetted with verified reviews from real travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready for your next adventure?</h2>
          <p>Join thousands of travelers discovering unique experiences around the world</p>
          <div>
            <Link href="/conquistatour" className="btn btn-accent">Browse experiences</Link>
            <Link href="/leader/apply" className="btn btn-secondary">Become a host</Link>
          </div>
        </div>
      </section>
    </>
  )
}