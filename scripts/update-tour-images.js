const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateTourImages() {
  try {
    console.log('🖼️ Updating tours with stunning travel photography...')

    // Rome Tour - Roman Heritage & Culinary Discovery
    await prisma.conquistaTour.update({
      where: { slug: 'hidden-rome-walking-tour' },
      data: {
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2340&auto=format&fit=crop', // Colosseum at sunset
          'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2340&auto=format&fit=crop', // Roman Forum
          'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2340&auto=format&fit=crop', // Rome street food
          'https://images.unsplash.com/photo-1534612899740-55c821a90129?q=80&w=2340&auto=format&fit=crop', // Pasta making
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=2340&auto=format&fit=crop', // Trevi Fountain
          'https://images.unsplash.com/photo-1539650116574-75c0c6d73862?q=80&w=2340&auto=format&fit=crop', // Vatican City
          'https://images.unsplash.com/photo-1548678967-f1aec58f6fb2?q=80&w=2340&auto=format&fit=crop', // Roman marketplace
          'https://images.unsplash.com/photo-1533747409985-78991eda12c3?q=80&w=2340&auto=format&fit=crop', // Italian cuisine
          'https://images.unsplash.com/photo-1530109696076-3aafb73fb7bb?q=80&w=2340&auto=format&fit=crop', // Rome ancient streets
          'https://images.unsplash.com/photo-1544973999-e4227c09b48b?q=80&w=2340&auto=format&fit=crop', // Roman cooking class
        ])
      }
    })

    // Tokyo Tour - Cultural Immersion & Photography
    await prisma.conquistaTour.update({
      where: { slug: 'tokyo-street-photography-experience' },
      data: {
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2340&auto=format&fit=crop', // Tokyo skyline at night
          'https://images.unsplash.com/photo-1533392249226-9e53dd87a93e?q=80&w=2340&auto=format&fit=crop', // Traditional Tokyo market
          'https://images.unsplash.com/photo-1609194999105-b6c6f9bf1fa5?q=80&w=2340&auto=format&fit=crop', // Tokyo street photography
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2340&auto=format&fit=crop', // Japanese tea ceremony
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=2340&auto=format&fit=crop', // Tokyo temples
          'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=2340&auto=format&fit=crop', // Cherry blossoms
          'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2340&auto=format&fit=crop', // Traditional Japanese food
          'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2340&auto=format&fit=crop', // Tokyo neon streets
          'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2340&auto=format&fit=crop', // Traditional Japanese architecture
          'https://images.unsplash.com/photo-1549318773-1e2ba78b71e4?q=80&w=2340&auto=format&fit=crop', // Tokyo photographer at work
        ])
      }
    })

    // Barcelona Tour - Architecture & Catalan Culture
    await prisma.conquistaTour.update({
      where: { slug: 'barcelona-architecture-tour' },
      data: {
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2340&auto=format&fit=crop', // Sagrada Familia
          'https://images.unsplash.com/photo-1558642891-54be180ea339?q=80&w=2340&auto=format&fit=crop', // Park Güell
          'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?q=80&w=2340&auto=format&fit=crop', // Barcelona architecture detail
          'https://images.unsplash.com/photo-1556909114-2e2a9644e664?q=80&w=2340&auto=format&fit=crop', // Catalan cuisine
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=2340&auto=format&fit=crop', // Barcelona beach
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2340&auto=format&fit=crop', // Casa Batlló
          'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2340&auto=format&fit=crop', // Las Ramblas
          'https://images.unsplash.com/photo-1571056042023-0a1ac5bb43f3?q=80&w=2340&auto=format&fit=crop', // Barcelona tapas
          'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=2340&auto=format&fit=crop', // Barcelona Gothic Quarter
          'https://images.unsplash.com/photo-1594736797933-d0d2d7c8bb93?q=80&w=2340&auto=format&fit=crop', // Modern Barcelona architecture
        ])
      }
    })

    // Croatia Tour - Already has good images, but let's enhance them
    await prisma.conquistaTour.update({
      where: { slug: 'croatia-culinary-conquest-taste-of-the-adriatic' },
      data: {
        heroImages: JSON.stringify([
          'https://images.unsplash.com/photo-1555990538-d837cc704d80?q=80&w=2340&auto=format&fit=crop', // Croatian coastline
          'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2340&auto=format&fit=crop', // Dubrovnik old town
          'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2340&auto=format&fit=crop', // Croatian seafood
          'https://images.unsplash.com/photo-1513342791302-46a8a18ca9dc?q=80&w=2340&auto=format&fit=crop', // Croatian wine and olives
        ]),
        galleryImages: JSON.stringify([
          'https://images.unsplash.com/photo-1576022762421-4d89b9a85f94?q=80&w=2340&auto=format&fit=crop', // Split Palace
          'https://images.unsplash.com/photo-1578071421344-96b87d8c01a4?q=80&w=2340&auto=format&fit=crop', // Plitvice Lakes
          'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=2340&auto=format&fit=crop', // Croatian market
          'https://images.unsplash.com/photo-1531259683007-016a943cff19?q=80&w=2340&auto=format&fit=crop', // Traditional Croatian cooking
          'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2340&auto=format&fit=crop', // Croatian islands
          'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2340&auto=format&fit=crop', // Croatian traditional meal
        ])
      }
    })

    console.log('✅ Successfully updated all tours with stunning travel photography!')
    console.log('')
    console.log('📸 Image categories updated:')
    console.log('- Rome: Ancient sites, culinary experiences, cooking classes')
    console.log('- Tokyo: Modern culture, temples, street photography, tea ceremonies')
    console.log('- Barcelona: Gaudí architecture, Gothic Quarter, Catalan cuisine')
    console.log('- Croatia: Coastal beauty, historical sites, traditional cuisine')
    console.log('')
    console.log('🗂️ Asset folders created for user uploads:')
    console.log('- public/assets/images/tours/rome/')
    console.log('- public/assets/images/tours/tokyo/')
    console.log('- public/assets/images/tours/barcelona/')
    console.log('- public/assets/images/tours/croatia/')

  } catch (error) {
    console.error('❌ Error updating tour images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateTourImages()