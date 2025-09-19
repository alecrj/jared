const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addCroatiaTrip() {
  try {
    // Create a leader user for the Croatia trip
    const leader = await prisma.user.create({
      data: {
        email: 'croatia.leader@culinaryconquistador.com',
        phone: '+1-555-0123',
        role: 'LEADER',
        profile: {
          create: {
            firstName: 'Marco',
            lastName: 'Adriatic',
            displayName: 'Marco Adriatic',
            bio: 'Experienced culinary tour leader with 8+ years guiding food and wine experiences throughout the Balkans. Native Croatian speaker with deep knowledge of traditional cooking techniques and local wine production.',
            culinaryBackground: 'Certified sommelier and graduate of Zagreb Culinary Institute. Previously worked as chef in Dubrovnik before transitioning to culinary tourism.',
            verificationStatus: 'verified'
          }
        }
      },
      include: {
        profile: true
      }
    })

    console.log('Created leader:', leader)

    // Croatia trip data
    const croatiaTrip = {
      title: 'Croatia Culinary Conquest: Taste of the Adriatic',
      slug: 'croatia-culinary-conquest-taste-of-the-adriatic',
      tagline: 'Discover the hidden culinary treasures of Croatia\'s stunning coastline',
      description: 'Join us for an unforgettable 10-day culinary journey through Croatia\'s most beautiful destinations. From the medieval walls of Dubrovnik to the lavender fields of Hvar, experience authentic Croatian cuisine, world-class wines, and traditional cooking techniques passed down through generations. This carefully crafted tour combines cultural exploration with hands-on culinary experiences, guided tastings, and intimate cooking classes with local families.',
      location: 'Croatia (Dubrovnik, Hvar, Split, Plitvice, Zagreb)',
      duration: 10,
      cuisineTypes: 'Croatian, Mediterranean, Balkan',
      groupSize: 16,
      pricePerPerson: 345000, // $3450 in cents
      depositPercentage: 0.25,
      difficulty: 'All Levels',
      minAge: 21,
      cancellationPolicy: 'MODERATE',
      leaderId: leader.id,
      highlights: JSON.stringify([
        'Private cooking classes with Croatian families',
        'Wine tasting in Pelješac Peninsula vineyards',
        'Traditional peka cooking demonstration',
        'UNESCO World Heritage sites exploration',
        'Olive oil and lavender production tours',
        'Professional Croatian guide throughout',
        'Small group experience (max 16 people)',
        'Luxury 4-star accommodations'
      ]),
      inclusions: JSON.stringify([
        '9 nights accommodation in 4-star hotels',
        'All breakfasts, 6 lunches, 8 dinners',
        'All transportation within Croatia',
        'Professional English-speaking guide',
        'All cooking classes and wine tastings',
        'Entrance fees to attractions',
        'Airport transfers'
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Travel insurance',
        'Personal expenses & souvenirs',
        'Additional alcoholic beverages',
        'Tips for guide and drivers'
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Arrival in Dubrovnik',
          location: 'Dubrovnik',
          activities: [
            'Airport pickup and transfer to hotel',
            'Welcome dinner at Nautika Restaurant with Adriatic views',
            'Hotel check-in and trip orientation'
          ],
          accommodation: 'Hotel Excelsior Dubrovnik (4★)',
          meals: ['Dinner']
        },
        {
          day: 2,
          title: 'Dubrovnik Old Town & Culinary Discovery',
          location: 'Dubrovnik',
          activities: [
            'Guided walk of Dubrovnik\'s Old Town and City Walls',
            'Private cooking class with local family in Konavle Valley',
            'Food tour through Dubrovnik\'s hidden culinary gems'
          ],
          accommodation: 'Hotel Excelsior Dubrovnik',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 3,
          title: 'Pelješac Peninsula Wine Tour',
          location: 'Pelješac Peninsula',
          activities: [
            'Wine tasting tour to Pelješac Peninsula',
            'Visit Milos Winery & Grgich Winery in Trstenik',
            'Traditional peka cooking demonstration and lunch'
          ],
          accommodation: 'Hotel Excelsior Dubrovnik',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 4,
          title: 'Travel to Hvar Island',
          location: 'Hvar',
          activities: [
            'Ferry to Hvar Island (2.5 hours)',
            'Hvar town exploration and lavender field visit',
            'Sunset dinner at Spanjola Fortress'
          ],
          accommodation: 'Hotel Adriana Hvar (4★)',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 5,
          title: 'Hvar Island Experiences',
          location: 'Hvar',
          activities: [
            'Olive oil tasting and production tour',
            'Private yacht excursion with seafood lunch',
            'Traditional Croatian music and dance performance'
          ],
          accommodation: 'Hotel Adriana Hvar',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 6,
          title: 'Travel to Split',
          location: 'Split',
          activities: [
            'Ferry to Split (1 hour)',
            'Diocletian\'s Palace tour and market visit with local chef',
            'Cooking class at Jardin Wine Cellar'
          ],
          accommodation: 'Hotel Park Split (4★)',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 7,
          title: 'Split & Trogir Day Trip',
          location: 'Split & Trogir',
          activities: [
            'Day trip to UNESCO town of Trogir',
            'Traditional stone carving workshop',
            'Farewell dinner on Split\'s Riva promenade'
          ],
          accommodation: 'Hotel Park Split',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 8,
          title: 'Plitvice Lakes National Park',
          location: 'Plitvice Lakes',
          activities: [
            'Transfer to Plitvice Lakes with guided hike',
            'Traditional mountain cuisine at local restaurant',
            'Evening at leisure'
          ],
          accommodation: 'Hotel Jezero Plitvice (3★)',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 9,
          title: 'Zagreb Cultural Immersion',
          location: 'Zagreb',
          activities: [
            'Transfer to Zagreb (2 hours)',
            'Zagreb food market tour and street food tasting',
            'Traditional Zagreb tavern experience'
          ],
          accommodation: 'Hotel Dubrovnik Zagreb (4★)',
          meals: ['Breakfast', 'Lunch', 'Dinner']
        },
        {
          day: 10,
          title: 'Departure',
          location: 'Zagreb',
          activities: [
            'Final market visit and souvenir shopping',
            'Transfer to Zagreb Airport for departure'
          ],
          accommodation: 'N/A',
          meals: ['Breakfast']
        }
      ]),
      heroImages: JSON.stringify([
        'https://images.unsplash.com/photo-1555990538-e58fc7ea4af1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1541450046678-4c9a6e0b3d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      ]),
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1555990538-e58fc7ea4af1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541450046678-4c9a6e0b3d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1541450046678-4c9a6e0b3d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]),
      status: 'LIVE',
      featuredOrder: 1
    }

    // Create the tour
    const tour = await prisma.conquistaTour.create({
      data: croatiaTrip,
      include: {
        leader: {
          include: {
            profile: true
          }
        }
      }
    })

    console.log('Created Croatia tour:', tour)

    // Add some departures for 2026
    const departures = await prisma.departure.createMany({
      data: [
        {
          conquistatourId: tour.id,
          startDate: new Date('2026-05-15'),
          endDate: new Date('2026-05-24'),
          availableSpots: 16,
          status: 'LIVE'
        },
        {
          conquistatourId: tour.id,
          startDate: new Date('2026-06-12'),
          endDate: new Date('2026-06-21'),
          availableSpots: 16,
          status: 'LIVE'
        },
        {
          conquistatourId: tour.id,
          startDate: new Date('2026-09-10'),
          endDate: new Date('2026-09-19'),
          availableSpots: 16,
          status: 'LIVE'
        }
      ]
    })

    console.log('Created departures:', departures)

    console.log('✅ Croatia trip successfully added to the platform!')

  } catch (error) {
    console.error('Error adding Croatia trip:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addCroatiaTrip()