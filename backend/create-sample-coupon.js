const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSampleCoupon() {
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code: 'SAVE25NOW',
        discountType: 'PERCENTAGE',
        discountValue: 25,
        maxDiscount: 100,
        validFrom: new Date('2025-07-01'),
        validTo: new Date('2025-12-31'),
        usageLimitPerUser: 3,
        status: 'ACTIVE'
      }
    });
    console.log('Created sample coupon:', coupon);
    
    // Fetch all coupons
    const allCoupons = await prisma.coupon.findMany();
    console.log('All coupons:', allCoupons);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleCoupon();
