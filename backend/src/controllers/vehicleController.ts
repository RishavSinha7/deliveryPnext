import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { createSuccessResponse, createErrorResponse } from '../utils/helpers';
import prisma from '../config/database';
import logger from '../utils/logger';

class VehicleController {
  // Get driver's vehicles
  async getMyVehicles(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: req.user.userId },
        include: {
          vehicles: true
        }
      });

      if (!driverProfile) {
        return res.status(404).json(
          createErrorResponse('Driver profile not found')
        );
      }

      res.status(200).json(
        createSuccessResponse('Vehicles retrieved successfully', driverProfile.vehicles)
      );
    } catch (error) {
      logger.error('Get my vehicles error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Create vehicle
  async createVehicle(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      console.log('🚗 createVehicle - User:', req.user);
      console.log('🚗 createVehicle - Request body:', req.body);
      
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      // Find the driver's profile
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: req.user.userId }
      });

      if (!driverProfile) {
        console.log('🚗 Driver profile not found for user:', req.user.userId);
        return res.status(404).json(
          createErrorResponse('Driver profile not found. Please complete your driver registration first.')
        );
      }

      const {
        vehicleType,
        vehicleNumber,
        vehicleModel,
        yearOfManufacture,
        insuranceNumber,
        registrationDocument,
        insuranceDocument,
        pollutionDocument
      } = req.body;

      // Basic validation
      if (!vehicleType || !vehicleNumber || !vehicleModel || !yearOfManufacture || !insuranceNumber) {
        return res.status(400).json(
          createErrorResponse('Missing required vehicle fields')
        );
      }

      // Check for duplicate vehicle number
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { vehicleNumber }
      });
      if (existingVehicle) {
        return res.status(400).json(
          createErrorResponse('Vehicle number already exists')
        );
      }

      const vehicle = await prisma.vehicle.create({
        data: {
          driverProfileId: driverProfile.id,
          vehicleType,
          vehicleNumber,
          vehicleModel,
          yearOfManufacture,
          insuranceNumber,
          registrationDocument,
          insuranceDocument,
          pollutionDocument
        }
      });

      logger.info(`Vehicle created: ${vehicle.vehicleNumber} by driver ${req.user.userId}`);

      res.status(201).json(
        createSuccessResponse('Vehicle created successfully', vehicle)
      );
    } catch (error) {
      logger.error('Create vehicle error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Update vehicle
  async updateVehicle(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const { id } = req.params;
      if (!id) {
        return res.status(400).json(
          createErrorResponse('Vehicle ID is required')
        );
      }

      // Find the driver's profile
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: req.user.userId }
      });
      if (!driverProfile) {
        return res.status(404).json(
          createErrorResponse('Driver profile not found')
        );
      }

      // Find the vehicle and ensure it belongs to the driver
      const vehicle = await prisma.vehicle.findUnique({
        where: { id }
      });
      if (!vehicle || vehicle.driverProfileId !== driverProfile.id) {
        return res.status(404).json(
          createErrorResponse('Vehicle not found or access denied')
        );
      }

      const {
        vehicleType,
        vehicleNumber,
        vehicleModel,
        yearOfManufacture,
        insuranceNumber,
        registrationDocument,
        insuranceDocument,
        pollutionDocument
      } = req.body;

      // Only update provided fields
      const updateData: any = {};
      if (vehicleType) updateData.vehicleType = vehicleType;
      if (vehicleNumber) updateData.vehicleNumber = vehicleNumber;
      if (vehicleModel) updateData.vehicleModel = vehicleModel;
      if (yearOfManufacture) updateData.yearOfManufacture = yearOfManufacture;
      if (insuranceNumber) updateData.insuranceNumber = insuranceNumber;
      if (registrationDocument) updateData.registrationDocument = registrationDocument;
      if (insuranceDocument) updateData.insuranceDocument = insuranceDocument;
      if (pollutionDocument) updateData.pollutionDocument = pollutionDocument;

      // If vehicleNumber is being updated, check for duplicates
      if (vehicleNumber && vehicleNumber !== vehicle.vehicleNumber) {
        const existingVehicle = await prisma.vehicle.findUnique({ where: { vehicleNumber } });
        if (existingVehicle) {
          return res.status(400).json(
            createErrorResponse('Vehicle number already exists')
          );
        }
      }

      const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: updateData
      });

      logger.info(`Vehicle updated: ${updatedVehicle.vehicleNumber} by driver ${req.user.userId}`);

      res.status(200).json(
        createSuccessResponse('Vehicle updated successfully', updatedVehicle)
      );
    } catch (error) {
      logger.error('Update vehicle error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Delete vehicle
  async deleteVehicle(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        return res.status(401).json(
          createErrorResponse('Authentication required')
        );
      }

      const { id } = req.params;
      if (!id) {
        return res.status(400).json(
          createErrorResponse('Vehicle ID is required')
        );
      }

      // Find the driver's profile
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: req.user.userId }
      });
      if (!driverProfile) {
        return res.status(404).json(
          createErrorResponse('Driver profile not found')
        );
      }

      // Find the vehicle and ensure it belongs to the driver
      const vehicle = await prisma.vehicle.findUnique({
        where: { id }
      });
      if (!vehicle || vehicle.driverProfileId !== driverProfile.id) {
        return res.status(404).json(
          createErrorResponse('Vehicle not found or access denied')
        );
      }

      await prisma.vehicle.delete({ where: { id } });
      logger.info(`Vehicle deleted: ${vehicle.vehicleNumber} by driver ${req.user.userId}`);

      res.status(200).json(
        createSuccessResponse('Vehicle deleted successfully')
      );
    } catch (error) {
      logger.error('Delete vehicle error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Get all vehicles (Admin)
  async getAllVehicles(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      const vehicles = await prisma.vehicle.findMany({
        include: {
          driverProfile: {
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
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json(
        createSuccessResponse('Vehicles retrieved successfully', vehicles)
      );
    } catch (error) {
      logger.error('Get all vehicles error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Verify vehicle (Admin)
  async verifyVehicle(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json(
          createErrorResponse('Vehicle ID is required')
        );
      }

      // Find the vehicle
      const vehicle = await prisma.vehicle.findUnique({ where: { id } });
      if (!vehicle) {
        return res.status(404).json(
          createErrorResponse('Vehicle not found')
        );
      }

      const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: { isVerified: true }
      });

      logger.info(`Vehicle verified: ${updatedVehicle.vehicleNumber} by admin`);

      res.status(200).json(
        createSuccessResponse('Vehicle verified successfully', updatedVehicle)
      );
    } catch (error) {
      logger.error('Verify vehicle error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }

  // Update vehicle status (Admin)
  async updateVehicleStatus(req: AuthRequest, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      if (!id) {
        return res.status(400).json(
          createErrorResponse('Vehicle ID is required')
        );
      }
      if (typeof isActive !== 'boolean') {
        return res.status(400).json(
          createErrorResponse('isActive must be a boolean')
        );
      }

      // Find the vehicle
      const vehicle = await prisma.vehicle.findUnique({ where: { id } });
      if (!vehicle) {
        return res.status(404).json(
          createErrorResponse('Vehicle not found')
        );
      }

      const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: { isActive }
      });

      logger.info(`Vehicle status updated: ${updatedVehicle.vehicleNumber} by admin`);

      res.status(200).json(
        createSuccessResponse('Vehicle status updated successfully', updatedVehicle)
      );
    } catch (error) {
      logger.error('Update vehicle status error:', error);
      res.status(500).json(
        createErrorResponse('Internal server error')
      );
    }
  }
}

export const vehicleController = new VehicleController();
