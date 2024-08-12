/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SUCCESS, ERROR } from "../shared/api.response.types";
import { ServiceServices } from "./service.service";
import httpStatus from "http-status";

const createService = async (req: Request, res: Response) => {
  try {
    const service = await ServiceServices.createServiceIntoDB(req.body);
    SUCCESS(res, httpStatus.OK, "Service created successfully", service);
  } catch (error: any) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to create Service", [
      error.message,
    ]);
  }
};
const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await ServiceServices.getServiceByIdFromDB(req.params.id);
    SUCCESS(res, httpStatus.OK, "Service retrieved successfully", service);
  } catch (error: any) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve Service", [
      error.message,
    ]);
  }
};

const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceServices.getAllServicesFromDB();
    SUCCESS(res, httpStatus.OK, "Services retrieved successfully", services);
  } catch (error: any) {
    ERROR(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to retrieve Services",
      [error.message]
    );
  }
};

const updateService = async (req: Request, res: Response) => {
  try {
    const service = await ServiceServices.updateServiceInDB(
      req.params.id,
      req.body
    );
    SUCCESS(res, httpStatus.OK, "Service updated successfully", service);
  } catch (error: any) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to update Service", [
      error.message,
    ]);
  }
};

const deleteService = async (req: Request, res: Response) => {
  try {
    const result = await ServiceServices.softDeleteServiceInDB(req.params.id);

    if (result.message === "This service you already deleted earlier!") {
      return SUCCESS(res, httpStatus.OK, result.message, result.service);
    }

    return SUCCESS(res, httpStatus.OK, result.message, result.service);
  } catch (error: any) {
    return ERROR(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete Service",
      [error.message]
    );
  }
};

export const ServiceControllers = {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
};
