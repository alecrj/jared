const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function hideDemoTours() {
  try {
    // Set all tours except Croatia to DRAFT status so they don't show in LIVE tours
    const result = await prisma.conquistaTour.updateMany({
      where: {
        title: {
          not: 'Croatia Culinary Conquest: Taste of the Adriatic'
        }
      },
      data: {
        status: 'DRAFT'
      }
    })

    console.log(`✅ Hidden ${result.count} demo tours. Only Croatia trip is now live.`)

    // Show current live tours
    const liveTours = await prisma.conquistaTour.findMany({
      where: {
        status: 'LIVE'
      },
      select: {
        title: true,
        status: true
      }
    })

    console.log('\n📋 Currently live tours:')
    liveTours.forEach(tour => {
      console.log(`- ${tour.title} (${tour.status})`)
    })

  } catch (error) {
    console.error('Error hiding demo tours:', error)
  } finally {
    await prisma.$disconnect()
  }
}

hideDemoTours()