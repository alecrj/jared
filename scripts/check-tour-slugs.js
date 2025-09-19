const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkTourSlugs() {
  try {
    const tours = await prisma.conquistaTour.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        status: true
      }
    })

    console.log('📋 Current tours in database:')
    tours.forEach(tour => {
      console.log(`- ID: ${tour.id} | Slug: "${tour.slug}" | Title: "${tour.title}" | Status: ${tour.status}`)
    })

  } catch (error) {
    console.error('❌ Error checking tours:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTourSlugs()