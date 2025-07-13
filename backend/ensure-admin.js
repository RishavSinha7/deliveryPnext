const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function ensureAdmin() {
  try {
    console.log('Ensuring admin user exists...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@deliverypartner.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      
      // Verify password is correct
      const isPasswordCorrect = await bcrypt.compare('admin123', existingAdmin.password);
      if (!isPasswordCorrect) {
        console.log('🔧 Updating admin password...');
        const hashedPassword = await bcrypt.hash('admin123', 12);
        await prisma.user.update({
          where: { email: 'admin@deliverypartner.com' },
          data: { password: hashedPassword }
        });
        console.log('✅ Admin password updated');
      }

      // Ensure admin role
      if (existingAdmin.role !== 'ADMIN') {
        console.log('🔧 Updating admin role...');
        await prisma.user.update({
          where: { email: 'admin@deliverypartner.com' },
          data: { role: 'ADMIN' }
        });
        console.log('✅ Admin role updated');
      }

    } else {
      console.log('Creating new admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await prisma.user.create({
        data: {
          fullName: 'System Administrator',
          email: 'admin@deliverypartner.com',
          phoneNumber: '+1234567890',
          password: hashedPassword,
          role: 'ADMIN',
          isActive: true,
          isEmailVerified: true,
          isPhoneVerified: true,
        }
      });
      
      console.log('✅ Admin user created successfully');
    }

    console.log('\n📋 Admin Login Credentials:');
    console.log('Email: admin@deliverypartner.com');
    console.log('Password: admin123');
    console.log('\n🔒 Admin panel is now secure!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  ensureAdmin();
}

module.exports = { ensureAdmin };
