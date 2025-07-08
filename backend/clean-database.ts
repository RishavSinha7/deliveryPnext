import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('🧹 Starting database cleanup...');
    console.log('⚠️  This will delete ALL data except Admin users and their profiles');
    
    // First, let's count existing data
    const adminUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'SUPER_ADMIN']
        }
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    });

    console.log(`✅ Found ${adminUsers.length} Admin users that will be preserved:`);
    adminUsers.forEach(admin => {
      console.log(`   - ${admin.email} (${admin.role})`);
    });

    const adminUserIds = adminUsers.map(admin => admin.id);

    // Count current data
    const counts = {
      users: await prisma.user.count(),
      customerProfiles: await prisma.customerProfile.count(),
      driverProfiles: await prisma.driverProfile.count(),
      userProfiles: await prisma.userProfile.count(),
      vehicles: await prisma.vehicle.count(),
      bookings: await prisma.booking.count(),
      trips: await prisma.trip.count(),
      transactions: await prisma.transaction.count(),
      reviews: await prisma.review.count(),
      notifications: await prisma.notification.count(),
      supportTickets: await prisma.supportTicket.count(),
    };

    console.log('\n📊 Current data counts:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`   ${table}: ${count}`);
    });

    console.log('\n🗑️  Starting deletion process...');

    // Delete in correct order to respect foreign key constraints
    
    // 1. Delete reviews (depends on bookings and users)
    console.log('   Deleting reviews...');
    const deletedReviews = await prisma.review.deleteMany({
      where: {
        reviewerId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedReviews.count} reviews`);

    // 2. Delete trips (depends on bookings, driver profiles, vehicles)
    console.log('   Deleting trips...');
    const deletedTrips = await prisma.trip.deleteMany({});
    console.log(`   ✅ Deleted ${deletedTrips.count} trips`);

    // 3. Delete transactions (depends on users and bookings)
    console.log('   Deleting transactions...');
    const deletedTransactions = await prisma.transaction.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedTransactions.count} transactions`);

    // 4. Delete bookings (depends on users, driver profiles, vehicles)
    console.log('   Deleting bookings...');
    const deletedBookings = await prisma.booking.deleteMany({
      where: {
        customerId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedBookings.count} bookings`);

    // 5. Delete vehicles (depends on driver profiles)
    console.log('   Deleting vehicles...');
    const deletedVehicles = await prisma.vehicle.deleteMany({});
    console.log(`   ✅ Deleted ${deletedVehicles.count} vehicles`);

    // 6. Delete notifications (depends on users)
    console.log('   Deleting notifications...');
    const deletedNotifications = await prisma.notification.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedNotifications.count} notifications`);

    // 7. Delete support tickets (depends on users)
    console.log('   Deleting support tickets...');
    const deletedTickets = await prisma.supportTicket.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedTickets.count} support tickets`);

    // 8. Delete driver profiles (depends on users)
    console.log('   Deleting driver profiles...');
    const deletedDriverProfiles = await prisma.driverProfile.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedDriverProfiles.count} driver profiles`);

    // 9. Delete customer profiles (depends on users)
    console.log('   Deleting customer profiles...');
    const deletedCustomerProfiles = await prisma.customerProfile.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedCustomerProfiles.count} customer profiles`);

    // 10. Delete user profiles (depends on users) - but keep admin user profiles
    console.log('   Deleting user profiles...');
    const deletedUserProfiles = await prisma.userProfile.deleteMany({
      where: {
        userId: {
          notIn: adminUserIds
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedUserProfiles.count} user profiles`);

    // 11. Finally, delete non-admin users
    console.log('   Deleting non-admin users...');
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        role: {
          notIn: ['ADMIN', 'SUPER_ADMIN']
        }
      }
    });
    console.log(`   ✅ Deleted ${deletedUsers.count} non-admin users`);

    // Show final counts
    console.log('\n📊 Final data counts:');
    const finalCounts = {
      users: await prisma.user.count(),
      adminProfiles: await prisma.adminProfile.count(),
      userProfiles: await prisma.userProfile.count(),
      customerProfiles: await prisma.customerProfile.count(),
      driverProfiles: await prisma.driverProfile.count(),
      vehicles: await prisma.vehicle.count(),
      bookings: await prisma.booking.count(),
      trips: await prisma.trip.count(),
      transactions: await prisma.transaction.count(),
      reviews: await prisma.review.count(),
      notifications: await prisma.notification.count(),
      supportTickets: await prisma.supportTicket.count(),
    };

    Object.entries(finalCounts).forEach(([table, count]) => {
      console.log(`   ${table}: ${count}`);
    });

    console.log('\n✅ Database cleanup completed successfully!');
    console.log(`✅ Preserved ${adminUsers.length} admin users and their related data`);
    
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup if this script is executed directly
if (require.main === module) {
  cleanDatabase()
    .then(() => {
      console.log('🎉 Database cleanup script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database cleanup script failed:', error);
      process.exit(1);
    });
}

export { cleanDatabase };
