const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addFeaturedExperiences() {
  try {
    // First create leaders for each experience
    const romeLeader = await prisma.user.create({
      data: {
        email: 'maria.rossi@culinaryconquistador.com',
        phone: '+39-06-555-0123',
        role: 'LEADER',
        profile: {
          create: {
            firstName: 'Maria',
            lastName: 'Rossi',
            displayName: 'Maria Rossi',
            bio: 'Local Roman historian and licensed tour guide with 12+ years of experience. Passionate about sharing Rome\'s hidden stories and secret places that tourists never see.',
            culinaryBackground: 'Licensed tour guide specializing in Roman history and culture. Expert in ancient Roman cuisine and traditional Italian cooking.',
            verificationStatus: 'verified'
          }
        }
      },
      include: { profile: true }
    })

    const tokyoLeader = await prisma.user.create({
      data: {
        email: 'takeshi.yamamoto@culinaryconquistador.com',
        phone: '+81-3-555-0123',
        role: 'LEADER',
        profile: {
          create: {
            firstName: 'Takeshi',
            lastName: 'Yamamoto',
            displayName: 'Takeshi Yamamoto',
            bio: 'Professional photographer and Tokyo native with 15+ years capturing the soul of Japan. Specializes in street photography and knows all the best hidden spots in Tokyo.',
            culinaryBackground: 'Award-winning photographer and cultural guide. Expert in Japanese street food and photography techniques.',
            verificationStatus: 'verified'
          }
        }
      },
      include: { profile: true }
    })

    const barcelonaLeader = await prisma.user.create({
      data: {
        email: 'carlos.mendez@culinaryconquistador.com',
        phone: '+34-93-555-0123',
        role: 'LEADER',
        profile: {
          create: {
            firstName: 'Carlos',
            lastName: 'Mendez',
            displayName: 'Carlos Mendez',
            bio: 'Architect and Barcelona local with deep passion for Gaudí and Modernisme. Offers unique insights into the city\'s architectural masterpieces and hidden gems.',
            culinaryBackground: 'Licensed architect and cultural guide specializing in Catalan architecture and traditional Catalan cuisine.',
            verificationStatus: 'verified'
          }
        }
      },
      include: { profile: true }
    })

    // Hidden Rome Walking Tour
    const romeTrip = await prisma.conquistaTour.create({
      data: {
        title: 'Hidden Rome Walking Tour',
        slug: 'hidden-rome-walking-tour',
        tagline: 'Discover secret Rome beyond the tourist trails',
        description: 'Step off the beaten path and explore Rome like a local. This intimate walking tour reveals hidden courtyards, secret churches, underground ruins, and local neighborhoods that most visitors never see. Led by a native Roman historian, you\'ll discover stories and places that bring the Eternal City to life in ways guidebooks never could.',
        location: 'Rome, Italy',
        duration: 1,
        cuisineTypes: 'Italian, Roman',
        groupSize: 8,
        pricePerPerson: 8500, // $85 in cents
        depositPercentage: 0.30,
        difficulty: 'Easy',
        minAge: 16,
        cancellationPolicy: 'FLEXIBLE',
        leaderId: romeLeader.id,
        highlights: JSON.stringify([
          'Hidden underground basilica of San Clemente',
          'Secret garden courtyard of Santa Maria della Pace',
          'Local neighborhood of Trastevere',
          'Ancient Roman ruins in unexpected places',
          'Traditional Roman aperitivo tasting',
          'Stories and legends only locals know',
          'Small group experience (max 8 people)',
          'Native Roman historian guide'
        ]),
        inclusions: JSON.stringify([
          'Professional local guide',
          'Entrance to hidden sites',
          'Traditional aperitivo and snacks',
          'Digital photo memories',
          'Detailed neighborhood map'
        ]),
        exclusions: JSON.stringify([
          'Transportation to meeting point',
          'Meals (except aperitivo)',
          'Personal expenses',
          'Gratuities'
        ]),
        itinerary: JSON.stringify([
          {
            day: 1,
            title: 'Hidden Rome Discovery',
            location: 'Rome Historic Center',
            activities: [
              'Meet at Piazza Navona for introduction and orientation',
              'Explore the hidden underground basilica of San Clemente',
              'Discover the secret courtyard garden of Santa Maria della Pace',
              'Walk through the authentic neighborhood of Trastevere',
              'Visit lesser-known ancient Roman ruins and archaeological sites',
              'Learn about Roman daily life and local traditions',
              'Traditional aperitivo tasting at a local enoteca',
              'Photography tips for capturing Rome\'s hidden beauty'
            ],
            accommodation: 'N/A',
            meals: ['Aperitivo & Snacks']
          }
        ]),
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1552832230-c0197040d963?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1552832230-c0197040d963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1548585511-ccd437d75463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]),
        status: 'LIVE',
        featuredOrder: 2
      }
    })

    // Tokyo Street Photography
    const tokyoTrip = await prisma.conquistaTour.create({
      data: {
        title: 'Tokyo Street Photography Experience',
        slug: 'tokyo-street-photography-experience',
        tagline: 'Capture the soul of Tokyo through your lens',
        description: 'Join a professional photographer for an immersive street photography experience through Tokyo\'s most photogenic neighborhoods. Learn advanced techniques while discovering hidden alleys, neon-lit streets, and authentic moments that define modern Japan. Perfect for photographers of all levels who want to capture Tokyo\'s unique energy.',
        location: 'Tokyo, Japan',
        duration: 1,
        cuisineTypes: 'Japanese, Street Food',
        groupSize: 6,
        pricePerPerson: 12000, // $120 in cents
        depositPercentage: 0.25,
        difficulty: 'Moderate',
        minAge: 18,
        cancellationPolicy: 'MODERATE',
        leaderId: tokyoLeader.id,
        highlights: JSON.stringify([
          'Professional photography mentorship',
          'Access to hidden Tokyo neighborhoods',
          'Advanced street photography techniques',
          'Traditional Japanese street food tasting',
          'Golden hour shooting in Shibuya',
          'Post-processing tips and techniques',
          'Small group experience (max 6 people)',
          'Digital photo review and feedback'
        ]),
        inclusions: JSON.stringify([
          'Professional photographer guide',
          'Photography technique instruction',
          'Street food tastings',
          'Transportation between locations',
          'Digital photo review session',
          'Photography location map'
        ]),
        exclusions: JSON.stringify([
          'Camera equipment (bring your own)',
          'Additional meals',
          'Personal expenses',
          'Photo editing software'
        ]),
        itinerary: JSON.stringify([
          {
            day: 1,
            title: 'Tokyo Street Photography Adventure',
            location: 'Tokyo (Shibuya, Shinjuku, Harajuku)',
            activities: [
              'Meet at Shibuya Crossing for photography basics and camera settings',
              'Capture the energy of Shibuya\'s famous scramble crossing',
              'Explore the narrow alleys and street food stalls of Memory Lane',
              'Photography walk through Harajuku\'s colorful street culture',
              'Learn composition and lighting techniques in Meiji Shrine area',
              'Traditional ramen and street food tasting break',
              'Golden hour photography session in Shinjuku',
              'Photo review and feedback session',
              'Post-processing tips and digital workflow advice'
            ],
            accommodation: 'N/A',
            meals: ['Street Food Tastings']
          }
        ]),
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]),
        status: 'LIVE',
        featuredOrder: 3
      }
    })

    // Barcelona Architecture Tour
    const barcelonaTrip = await prisma.conquistaTour.create({
      data: {
        title: 'Barcelona Architecture Tour',
        slug: 'barcelona-architecture-tour',
        tagline: 'Explore Gaudí\'s masterpieces and Modernisme movement',
        description: 'Discover Barcelona\'s architectural wonders with a licensed architect guide. From Gaudí\'s iconic Sagrada Familia to hidden Modernisme gems, explore the city\'s unique architectural heritage. Learn about the techniques, history, and cultural significance of Barcelona\'s most stunning buildings.',
        location: 'Barcelona, Spain',
        duration: 1,
        cuisineTypes: 'Catalan, Spanish',
        groupSize: 10,
        pricePerPerson: 9500, // $95 in cents
        depositPercentage: 0.25,
        difficulty: 'Easy',
        minAge: 12,
        cancellationPolicy: 'MODERATE',
        leaderId: barcelonaLeader.id,
        highlights: JSON.stringify([
          'Sagrada Familia exterior architectural analysis',
          'Park Güell\'s innovative design elements',
          'Casa Batlló and Casa Milà facades',
          'Hidden Modernisme buildings',
          'Professional architect guide',
          'Traditional Catalan vermouth tasting',
          'Small group experience (max 10 people)',
          'Architecture sketching workshop'
        ]),
        inclusions: JSON.stringify([
          'Licensed architect guide',
          'Entrance to Park Güell',
          'Architecture sketching materials',
          'Traditional vermouth and tapas',
          'Detailed architecture map',
          'Digital resource guide'
        ]),
        exclusions: JSON.stringify([
          'Entrance to Sagrada Familia interior',
          'Entrance to Casa Batlló/Milà interiors',
          'Transportation between sites',
          'Additional meals',
          'Personal expenses'
        ]),
        itinerary: JSON.stringify([
          {
            day: 1,
            title: 'Barcelona Architecture Discovery',
            location: 'Barcelona City Center & Gràcia',
            activities: [
              'Meet at Sagrada Familia for architectural analysis and history',
              'Detailed explanation of Gaudí\'s techniques and symbolism',
              'Walk along Passeig de Gràcia to see Casa Batlló and Casa Milà',
              'Explore hidden Modernisme buildings in the Eixample district',
              'Visit Park Güell for landscape architecture and city views',
              'Architecture sketching workshop in the park',
              'Traditional Catalan vermouth and tapas tasting',
              'Discussion of Barcelona\'s urban planning and architectural evolution',
              'Q&A session with professional architect guide'
            ],
            accommodation: 'N/A',
            meals: ['Vermouth & Tapas']
          }
        ]),
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571501679097-c8c8b0bb0634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]),
        status: 'LIVE',
        featuredOrder: 4
      }
    })

    // Add departures for each experience
    await prisma.departure.createMany({
      data: [
        // Rome departures
        {
          conquistatourId: romeTrip.id,
          startDate: new Date('2025-10-15'),
          endDate: new Date('2025-10-15'),
          availableSpots: 8,
          status: 'LIVE'
        },
        {
          conquistatourId: romeTrip.id,
          startDate: new Date('2025-10-22'),
          endDate: new Date('2025-10-22'),
          availableSpots: 8,
          status: 'LIVE'
        },
        {
          conquistatourId: romeTrip.id,
          startDate: new Date('2025-11-05'),
          endDate: new Date('2025-11-05'),
          availableSpots: 8,
          status: 'LIVE'
        },
        // Tokyo departures
        {
          conquistatourId: tokyoTrip.id,
          startDate: new Date('2025-10-20'),
          endDate: new Date('2025-10-20'),
          availableSpots: 6,
          status: 'LIVE'
        },
        {
          conquistatourId: tokyoTrip.id,
          startDate: new Date('2025-11-10'),
          endDate: new Date('2025-11-10'),
          availableSpots: 6,
          status: 'LIVE'
        },
        {
          conquistatourId: tokyoTrip.id,
          startDate: new Date('2025-11-24'),
          endDate: new Date('2025-11-24'),
          availableSpots: 6,
          status: 'LIVE'
        },
        // Barcelona departures
        {
          conquistatourId: barcelonaTrip.id,
          startDate: new Date('2025-10-18'),
          endDate: new Date('2025-10-18'),
          availableSpots: 10,
          status: 'LIVE'
        },
        {
          conquistatourId: barcelonaTrip.id,
          startDate: new Date('2025-11-01'),
          endDate: new Date('2025-11-01'),
          availableSpots: 10,
          status: 'LIVE'
        },
        {
          conquistatourId: barcelonaTrip.id,
          startDate: new Date('2025-11-15'),
          endDate: new Date('2025-11-15'),
          availableSpots: 10,
          status: 'LIVE'
        }
      ]
    })

    console.log('✅ Successfully added all featured experiences!')
    console.log('- Hidden Rome Walking Tour ($85)')
    console.log('- Tokyo Street Photography Experience ($120)')
    console.log('- Barcelona Architecture Tour ($95)')
    console.log('- All with professional guides and complete itineraries')

  } catch (error) {
    console.error('Error adding featured experiences:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addFeaturedExperiences()