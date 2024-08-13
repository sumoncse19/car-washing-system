import express from "express";
import requireAuth from "../../middleware/requireAuth";
import { BookingControllers } from "./booking.controller";
import { Roles } from "../shared/user.enumeration";

const router = express.Router();

router.get("/", requireAuth(Roles.USER), BookingControllers.getUserBookings);

export const MyBookingsRoutes = router;
