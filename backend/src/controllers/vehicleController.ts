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
      res.status(200).json(
        createSuccessResponse('Create vehicle functionality not yet implemented')
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
      res.status(200).json(
        createSuccessResponse('Update vehicle functionality not yet implemented')
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
      res.status(200).json(
        createSuccessResponse('Delete vehicle functionality not yet implemented')
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
      res.status(200).json(
        createSuccessResponse('Verify vehicle functionality not yet implemented')
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
      res.status(200).json(
        createSuccessResponse('Update vehicle status functionality not yet implemented')
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
