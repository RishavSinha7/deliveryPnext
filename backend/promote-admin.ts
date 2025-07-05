import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function promoteUserToAdmin() {
  try {
    // List current users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true
      }
    });

    console.log('Current Users:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.fullName} (${user.email}) - Role: ${user.role}`);
    });

    // Promote the first user (Rishav Sinha) to SUPER_ADMIN
    const userToPromote = users.find(user => user.email === 'rishavkumarsinha3@gmail.com');
    
    if (userToPromote) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userToPromote.id
        },
        data: {
          role: 'SUPER_ADMIN'
        }
      });

      console.log(`\n✅ Successfully promoted ${updatedUser.fullName} to SUPER_ADMIN`);
      console.log(`   Email: ${updatedUser.email}`);
      console.log(`   User ID: ${updatedUser.id}`);
      console.log(`   You can now login with:`);
      console.log(`   Email: ${updatedUser.email}`);
      console.log(`   Password: [The password you used when registering]`);
    } else {
      console.log('User not found');
    }

  } catch (error) {
    console.error('Error promoting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

promoteUserToAdmin();
