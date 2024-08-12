/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SUCCESS, ERROR } from "../shared/api.response.types";
import httpStatus from "http-status";
import { SlotServices } from "./slot.service";

const createSlot = async (req: Request, res: Response) => {
  try {
    const { service, date, startTime, endTime } = req.body;
    const createdSlots = await SlotServices.createSlotsIntoDB(
      service,
      date,
      startTime,
      endTime
    );
    SUCCESS(
      res,
      httpStatus.CREATED,
      "Slots created successfully",
      createdSlots
    );
  } catch (error: any) {
    ERROR(
      res,
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create slots",
      [error.stack]
    );
  }
};

const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date, serviceId } = req.query;
    const availableSlots = await SlotServices.getAvailableSlotsFromDB(
      date as string,
      serviceId as string
    );
    SUCCESS(
      res,
      httpStatus.OK,
      "Available slots retrieved successfully",
      availableSlots
    );
  } catch (error: any) {
    ERROR(
      res,
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to retrieve available slots",
      [error.stack]
    );
  }
};

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};
