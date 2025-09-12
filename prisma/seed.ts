import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@culinaryconquistador.com',
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          displayName: 'Admin User',
          bio: 'Platform administrator',
          culinaryBackground: 'Administration',
        }
      }
    }
  })

  const leader1 = await prisma.user.create({
    data: {
      email: 'maria@example.com',
      role: 'LEADER',
      profile: {
        create: {
          firstName: 'Maria',
          lastName: 'Rodriguez',
          displayName: 'Chef Maria',
          bio: 'Passionate about authentic Spanish and Mediterranean cuisine with 15+ years of culinary experience.',
          culinaryBackground: 'Professional chef specializing in Mediterranean cuisine, trained in Barcelona and Rome.',
          avatarUrl: '/avatars/maria.jpg'
        }
      }
    }
  })

  const leader2 = await prisma.user.create({
    data: {
      email: 'kenji@example.com',
      role: 'LEADER',
      profile: {
        create: {
          firstName: 'Kenji',
          lastName: 'Tanaka',
          displayName: 'Kenji San',
          bio: 'Japanese food enthusiast and sake expert, sharing the art of authentic Japanese cuisine.',
          culinaryBackground: 'Food blogger and sake sommelier with deep knowledge of traditional Japanese cooking.',
          avatarUrl: '/avatars/kenji.jpg'
        }
      }
    }
  })

  const leader3 = await prisma.user.create({
    data: {
      email: 'giovanni@example.com',
      role: 'LEADER',
      profile: {
        create: {
          firstName: 'Giovanni',
          lastName: 'Rossi',
          displayName: 'Giovanni the Foodie',
          bio: 'Italian food lover and wine connoisseur, born and raised in Tuscany.',
          culinaryBackground: 'Local food expert and wine producer from a family-owned vineyard in Chianti.',
          avatarUrl: '/avatars/giovanni.jpg'
        }
      }
    }
  })

  // Create travelers
  const traveler1 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      role: 'TRAVELER',
      profile: {
        create: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          displayName: 'Sarah J',
          bio: 'Food lover and travel enthusiast',
          culinaryBackground: 'Home cook with passion for international cuisines'
        }
      }
    }
  })

  // Create conquistatours
  const tour1 = await prisma.conquistaTour.create({
    data: {
      leaderId: leader1.id,
      title: 'Barcelona Tapas & Market Adventure',
      slug: 'barcelona-tapas-market-adventure',
      tagline: 'Discover authentic Spanish tapas culture and fresh market ingredients in the heart of Barcelona',
      description: 'Join Chef Maria on an unforgettable culinary journey through Barcelona\'s vibrant food scene. We\'ll explore the famous Boqueria Market, learn to make traditional tapas, and discover hidden local gems that only locals know about.',
      cuisineTypes: 'Spanish,Mediterranean,Tapas',
      location: 'Barcelona, Spain',
      duration: 5,
      difficulty: 'Beginner Friendly',
      groupSize: 12,
      inclusions: JSON.stringify([
        'Professional culinary guide',
        'All meals and tastings',
        'Market tours and ingredient shopping',
        'Cooking classes with recipes',
        'Wine pairings',
        'Local transportation'
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Accommodation',
        'Personal expenses',
        'Travel insurance'
      ]),
      highlights: JSON.stringify([
        'Private tour of La Boqueria Market',
        'Hands-on paella cooking class',
        'Tapas crawl through El Born district',
        'Wine tasting in historic cellar',
        'Meet local food artisans',
        'Recipe collection to take home'
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Arrival & Welcome Dinner',
          activities: ['Airport pickup', 'Welcome dinner at traditional taberna', 'Meet your group']
        },
        {
          day: 2,
          title: 'Market Tour & Cooking Class',
          activities: ['La Boqueria Market tour', 'Ingredient selection', 'Traditional paella cooking class', 'Lunch with group']
        },
        {
          day: 3,
          title: 'Tapas Culture Immersion',
          activities: ['Tapas making workshop', 'El Born district food walk', 'Local wine tasting', 'Dinner at hidden gem restaurant']
        },
        {
          day: 4,
          title: 'Coastal Flavors',
          activities: ['Day trip to coastal fishing village', 'Fresh seafood experience', 'Beachside paella lunch', 'Sunset wine tasting']
        },
        {
          day: 5,
          title: 'Farewell Feast',
          activities: ['Final cooking challenge', 'Group feast preparation', 'Certificate ceremony', 'Departure']
        }
      ]),
      heroImages: JSON.stringify([
        '/tours/barcelona-1.svg',
        '/placeholder-food.svg',
        '/placeholder-food.svg'
      ]),
      galleryImages: JSON.stringify([
        '/tours/barcelona-1.svg',
        '/placeholder-food.svg',
        '/placeholder-food.svg',
        '/placeholder-food.svg'
      ]),
      pricePerPerson: 189500, // $1,895
      depositPercentage: 0.25,
      cancellationPolicy: 'MODERATE',
      minAge: 16,
      status: 'LIVE',
      featuredOrder: 1
    }
  })

  const tour2 = await prisma.conquistaTour.create({
    data: {
      leaderId: leader2.id,
      title: 'Tokyo Culinary Secrets',
      slug: 'tokyo-culinary-secrets',
      tagline: 'Unlock the mysteries of Japanese cuisine with authentic experiences in Tokyo',
      description: 'Embark on a gastronomic journey through Tokyo with Kenji San, exploring traditional techniques, seasonal ingredients, and the art of Japanese cooking.',
      cuisineTypes: 'Japanese,Sushi,Ramen',
      location: 'Tokyo, Japan',
      duration: 7,
      difficulty: 'Intermediate',
      groupSize: 8,
      inclusions: JSON.stringify([
        'Expert Japanese cuisine guide',
        'All meals and sake tastings',
        'Tsukiji Fish Market early morning tour',
        'Sushi and ramen making classes',
        'Traditional tea ceremony',
        'Local metro passes'
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Accommodation',
        'Personal shopping',
        'Travel insurance'
      ]),
      highlights: JSON.stringify([
        'Private sushi making with master chef',
        'Authentic ramen from scratch',
        'Tsukiji Fish Market insider access',
        'Traditional kaiseki dinner',
        'Sake brewery tour and tasting',
        'Japanese knife skills workshop'
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Tokyo Welcome',
          activities: ['Arrival and hotel check-in', 'Welcome kaiseki dinner', 'Introduction to Japanese food culture']
        },
        {
          day: 2,
          title: 'Fish Market & Sushi',
          activities: ['4 AM Tsukiji Fish Market tour', 'Fresh sushi breakfast', 'Sushi making masterclass', 'Lunch at renowned sushi counter']
        },
        {
          day: 3,
          title: 'Ramen Deep Dive',
          activities: ['Ramen history and culture talk', 'Broth making workshop', 'Noodle pulling demonstration', 'Ramen tasting tour']
        }
      ]),
      heroImages: JSON.stringify([
        '/tours/tokyo-1.svg',
        '/placeholder-food.svg',
        '/placeholder-food.svg'
      ]),
      galleryImages: JSON.stringify([
        '/tours/tokyo-1.svg',
        '/placeholder-food.svg',
        '/placeholder-food.svg'
      ]),
      pricePerPerson: 289500, // $2,895
      depositPercentage: 0.25,
      cancellationPolicy: 'STRICT',
      minAge: 18,
      status: 'LIVE',
      featuredOrder: 2
    }
  })

  const tour3 = await prisma.conquistaTour.create({
    data: {
      leaderId: leader3.id,
      title: 'Tuscan Wine & Food Paradise',
      slug: 'tuscan-wine-food-paradise',
      tagline: 'Experience the heart of Italian cuisine in the rolling hills of Tuscany',
      description: 'Join Giovanni for an authentic Tuscan experience, learning traditional recipes, touring vineyards, and discovering the secrets of Italian cooking.',
      cuisineTypes: 'Italian,Tuscan,Wine',
      location: 'Tuscany, Italy',
      duration: 6,
      difficulty: 'All Levels',
      groupSize: 10,
      inclusions: JSON.stringify([
        'Local food expert guide',
        'All meals with wine pairings',
        'Vineyard tours and wine tastings',
        'Pasta and sauce making classes',
        'Truffle hunting experience',
        'Local transportation'
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Accommodation',
        'Personal purchases',
        'Travel insurance'
      ]),
      highlights: JSON.stringify([
        'Private vineyard tours with wine maker',
        'Traditional pasta making workshop',
        'Truffle hunting with trained dogs',
        'Farm-to-table dining experiences',
        'Medieval village exploration',
        'Olive oil tasting and production tour'
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Tuscan Welcome',
          activities: ['Arrival in Florence', 'Welcome dinner at family restaurant', 'Introduction to Tuscan cuisine']
        }
      ]),
      heroImages: JSON.stringify([
        '/tours/tuscany-1.svg',
        '/placeholder-food.svg'
      ]),
      galleryImages: JSON.stringify([
        '/tours/tuscany-1.svg'
      ]),
      pricePerPerson: 234500, // $2,345
      depositPercentage: 0.25,
      cancellationPolicy: 'MODERATE',
      minAge: 21,
      status: 'LIVE',
      featuredOrder: 3
    }
  })

  // Create departures for tours
  const departure1 = await prisma.departure.create({
    data: {
      conquistatourId: tour1.id,
      startDate: new Date('2025-04-15'),
      endDate: new Date('2025-04-19'),
      availableSpots: 10,
      status: 'LIVE'
    }
  })

  const departure2 = await prisma.departure.create({
    data: {
      conquistatourId: tour1.id,
      startDate: new Date('2025-05-20'),
      endDate: new Date('2025-05-24'),
      availableSpots: 12,
      status: 'LIVE'
    }
  })

  const departure3 = await prisma.departure.create({
    data: {
      conquistatourId: tour2.id,
      startDate: new Date('2025-06-10'),
      endDate: new Date('2025-06-16'),
      availableSpots: 6,
      status: 'LIVE'
    }
  })

  // Create sample reviews
  await prisma.review.create({
    data: {
      conquistatourId: tour1.id,
      travelerId: traveler1.id,
      rating: 5,
      title: 'Absolutely Amazing Experience!',
      content: 'Chef Maria was incredible! The tapas tour exceeded all expectations. Every meal was perfectly curated and the local markets were fascinating.',
      foodRating: 5,
      guideRating: 5,
      valueRating: 5,
      images: JSON.stringify(['/reviews/barcelona-review-1.jpg'])
    }
  })

  await prisma.review.create({
    data: {
      conquistatourId: tour2.id,
      travelerId: traveler1.id,
      rating: 5,
      title: 'Tokyo Food Heaven',
      content: 'Kenji San showed us the real Tokyo food scene. The sushi making class was life-changing!',
      foodRating: 5,
      guideRating: 5,
      valueRating: 4,
      images: JSON.stringify([])
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 4 users (1 admin, 3 leaders, 1 traveler)`)
  console.log(`   - 3 conquistatours`)
  console.log(`   - 3 departures`)
  console.log(`   - 2 reviews`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })