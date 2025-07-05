import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdminUsers() {
  try {
    // Find all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    // Find all users with ADMIN or SUPER_ADMIN roles
    const adminUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'SUPER_ADMIN']
        }
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    console.log('All Users in Database:');
    console.log('======================');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.fullName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Active: ${user.isActive}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('');
    });

    console.log('\nAdmin Users Found:');
    console.log('==================');
    
    if (adminUsers.length === 0) {
      console.log('No admin users found in the database.');
      console.log('\nTo create an admin user, you can:');
      console.log('1. Register through the frontend with role ADMIN');
      console.log('2. Use the admin registration endpoint');
      console.log('3. Update an existing user\'s role to ADMIN');
    } else {
      adminUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.fullName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Active: ${user.isActive}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log('   Password: [Hashed - Check registration logs or reset]');
        console.log('');
      });
    }

    // Also check total users
    const totalUsers = await prisma.user.count();
    console.log(`Total users in database: ${totalUsers}`);
    
  } catch (error) {
    console.error('Error checking admin users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminUsers();
