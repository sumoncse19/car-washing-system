/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SUCCESS, ERROR } from "../shared/api.response.types";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";

const bookService = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body,
      customerId = req.user.userId;
    bookingData.customerId = customerId;
    const booking = await BookingServices.createBookingIntoDB(bookingData);
    SUCCESS(res, httpStatus.CREATED, "Booking successful", booking);
  } catch (error: any) {
    ERROR(
      res,
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create booking",
      [error.stack]
    );
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingServices.getAllBookingsFromDB();
    SUCCESS(
      res,
      httpStatus.OK,
      "All bookings retrieved successfully",
      bookings
    );
  } catch (error: any) {
    ERROR(
      res,
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to retrieve bookings",
      [error.stack]
    );
  }
};

const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const bookings = await BookingServices.getUserBookingsFromDB(userId);
    SUCCESS(
      res,
      httpStatus.OK,
      "User bookings retrieved successfully",
      bookings
    );
  } catch (error: any) {
    ERROR(
      res,
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to retrieve user bookings",
      [error.stack]
    );
  }
};

export const BookingControllers = {
  bookService,
  getAllBookings,
  getUserBookings,
};
