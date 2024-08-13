import express from "express";
import requireAuth from "../../middleware/requireAuth";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { Roles } from "../shared/user.enumeration";
import { BookingSchema } from "./booking.schema";

const router = express.Router();

router.post(
  "/",
  requireAuth(Roles.USER),
  validateRequest(BookingSchema),
  BookingControllers.bookService
);

router.get("/", requireAuth(Roles.ADMIN), BookingControllers.getAllBookings);

export const BookingRoutes = router;
