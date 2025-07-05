import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { createSuccessResponse, createErrorResponse } from '../utils/helpers';
import prisma from '../config/database';
import logger from '../utils/logger';

class BookingController {
  // Create a new booking
  async createBooking(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const {
        serviceType,
        pickupAddress,
        pickupLatitude,
        pickupLongitude,
        dropoffAddress,
        dropoffLatitude,
        dropoffLongitude,
        pickupDateTime,
        estimatedFare,
        notes,
        paymentMethod = 'CASH'
      } = req.body;

      // Generate unique booking number
      const bookingNumber = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;

      const booking = await prisma.booking.create({
        data: {
          customerId: req.user.userId,
          bookingNumber,
          serviceType,
          pickupAddress,
          pickupLatitude,
          pickupLongitude,
          dropoffAddress,
          dropoffLatitude,
          dropoffLongitude,
          pickupDateTime: new Date(pickupDateTime),
          estimatedFare,
          notes,
          paymentMethod,
          status: 'PENDING'
        },
        include: {
          customer: {
            select: {
              id: true,
              fullName: true,
              phoneNumber: true
            }
          }
        }
      });

      logger.info(`New booking created: ${booking.bookingNumber}`);

      res.status(201).json(
        createSuccessResponse('Booking created successfully', booking)
      );
    } catch (error) {
      logger.error('Create booking error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Get user's bookings
  async getMyBookings(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;

      const skip = (page - 1) * limit;
      const where: any = { customerId: req.user.userId };

      if (status) {
        where.status = status;
      }

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where,
          include: {
            driver: {
              select: {
                id: true,
                user: {
                  select: {
                    fullName: true,
                    phoneNumber: true
                  }
                }
              }
            },
            vehicle: {
              select: {
                id: true,
                vehicleType: true,
                vehicleNumber: true
              }
            }
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.booking.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json(
        createSuccessResponse('Bookings retrieved successfully', {
          bookings,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          }
        })
      );
    } catch (error) {
      logger.error('Get my bookings error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Get booking by ID
  async getBookingById(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json(
          createErrorResponse('Booking ID is required')
        );
      }

      const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
          customer: {
            select: {
              id: true,
              fullName: true,
              phoneNumber: true
            }
          },
          driver: {
            select: {
              id: true,
              user: {
                select: {
                  fullName: true,
                  phoneNumber: true
                }
              }
            }
          },
          vehicle: {
            select: {
              id: true,
              vehicleType: true,
              vehicleNumber: true,
              vehicleModel: true
            }
          },
          trip: true
        }
      });

      if (!booking) {
        return res.status(404).json(
          createErrorResponse('Booking not found')
        );
      }

      // Check if user has permission to view this booking
      if (req.user.role === 'CUSTOMER' && booking.customerId !== req.user.userId) {
        return res.status(403).json(
          createErrorResponse('Access denied')
        );
      }

      if (req.user.role === 'DRIVER' && booking.driverId !== req.user.userId) {
        return res.status(403).json(
          createErrorResponse('Access denied')
        );
      }

      res.status(200).json(
        createSuccessResponse('Booking retrieved successfully', booking)
      );
    } catch (error) {
      logger.error('Get booking by ID error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Cancel booking
  async cancelBooking(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json(
          createErrorResponse('Booking ID is required')
        );
      }

      const booking = await prisma.booking.findUnique({
        where: { id },
        select: {
          id: true,
          customerId: true,
          status: true,
          bookingNumber: true
        }
      });

      if (!booking) {
        return res.status(404).json(
          createErrorResponse('Booking not found')
        );
      }

      // Check permission
      if (booking.customerId !== req.user.userId) {
        return res.status(403).json(
          createErrorResponse('Access denied')
        );
      }

      // Check if booking can be cancelled
      if (!['PENDING', 'CONFIRMED', 'DRIVER_ASSIGNED'].includes(booking.status)) {
        return res.status(400).json(
          createErrorResponse('Booking cannot be cancelled at this stage')
        );
      }

      const updatedBooking = await prisma.booking.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });

      logger.info(`Booking cancelled: ${booking.bookingNumber}`);

      res.status(200).json(
        createSuccessResponse('Booking cancelled successfully', updatedBooking)
      );
    } catch (error) {
      logger.error('Cancel booking error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Get available bookings for drivers
  async getAvailableBookings(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const bookings = await prisma.booking.findMany({
        where: {
          status: 'PENDING',
          driverId: null
        },
        include: {
          customer: {
            select: {
              fullName: true,
              phoneNumber: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      res.status(200).json(
        createSuccessResponse('Available bookings retrieved successfully', bookings)
      );
    } catch (error) {
      logger.error('Get available bookings error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Accept booking (Driver)
  async acceptBooking(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const { id } = req.params;

      if (!id) {
        return res.status(400).json(
          createErrorResponse('Booking ID is required')
        );
      }

      // Get driver profile
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: req.user.userId }
      });

      if (!driverProfile) {
        return res.status(404).json(
          createErrorResponse('Driver profile not found')
        );
      }

      // First, verify the booking is still pending and available
      const existingBooking = await prisma.booking.findUnique({
        where: { id },
        select: { id: true, status: true, driverId: true }
      });

      if (!existingBooking || existingBooking.status !== 'PENDING' || existingBooking.driverId) {
        return res.status(400).json(
          createErrorResponse('Booking is not available for assignment')
        );
      }

      // Update booking with driver assignment
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          driverId: driverProfile.id,
          status: 'DRIVER_ASSIGNED'
        },
        include: {
          customer: {
            select: {
              fullName: true,
              phoneNumber: true
            }
          }
        }
      });

      logger.info(`Booking accepted by driver: ${booking.bookingNumber}`);

      res.status(200).json(
        createSuccessResponse('Booking accepted successfully', booking)
      );
    } catch (error) {
      logger.error('Accept booking error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Start trip (Driver)
  async startTrip(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      // Implementation for starting a trip
      res.status(200).json(
        createSuccessResponse('Start trip functionality not yet implemented')
      );
    } catch (error) {
      logger.error('Start trip error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Complete trip (Driver)
  async completeTrip(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      // Implementation for completing a trip
      res.status(200).json(
        createSuccessResponse('Complete trip functionality not yet implemented')
      );
    } catch (error) {
      logger.error('Complete trip error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Update location during trip (Driver)
  async updateLocation(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      // Implementation for updating location
      res.status(200).json(
        createSuccessResponse('Update location functionality not yet implemented')
      );
    } catch (error) {
      logger.error('Update location error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Get all bookings (Admin)
  async getAllBookings(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;

      const skip = (page - 1) * limit;
      const where: any = {};

      if (status) {
        where.status = status;
      }

      const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
          where,
          include: {
            customer: {
              select: {
                fullName: true,
                phoneNumber: true
              }
            },
            driver: {
              select: {
                user: {
                  select: {
                    fullName: true,
                    phoneNumber: true
                  }
                }
              }
            }
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.booking.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json(
        createSuccessResponse('Bookings retrieved successfully', {
          bookings,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          }
        })
      );
    } catch (error) {
      logger.error('Get all bookings error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Assign driver to booking (Admin)
  async assignDriver(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      // Implementation for admin assigning driver
      res.status(200).json(
        createSuccessResponse('Assign driver functionality not yet implemented')
      );
    } catch (error) {
      logger.error('Assign driver error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Update booking status (Admin)
  async updateBookingStatus(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      // Implementation for admin updating booking status
      res.status(200).json(
        createSuccessResponse('Update booking status functionality not yet implemented')
      );
    } catch (error) {
      logger.error('Update booking status error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }
}

export const bookingController = new BookingController();
