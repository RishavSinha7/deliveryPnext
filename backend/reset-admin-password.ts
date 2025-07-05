import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const newPassword = 'admin123'; // Set a known password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the admin user's password
    const updatedUser = await prisma.user.update({
      where: {
        email: 'rishavkumarsinha3@gmail.com'
      },
      data: {
        password: hashedPassword
      }
    });

    console.log('✅ Admin password reset successfully!');
    console.log('');
    console.log('🔐 Admin Login Credentials:');
    console.log('===========================');
    console.log(`Email: ${updatedUser.email}`);
    console.log(`Password: ${newPassword}`);
    console.log(`Role: ${updatedUser.role}`);
    console.log('');
    console.log('📝 You can now login with these credentials:');
    console.log('1. Frontend: http://localhost:3003/auth');
    console.log('2. API endpoint: POST /api/auth/login');

  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
