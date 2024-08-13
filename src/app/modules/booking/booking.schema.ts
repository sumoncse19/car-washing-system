import { Types } from "mongoose";
import { z } from "zod";
import { Vehicle } from "./booking.enumeration";

export const BookingSchema = z.object({
  serviceId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid service ID",
  }),
  slotId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid slot ID",
  }),
  vehicleType: z.nativeEnum(Vehicle),
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.number().min(1900).max(new Date().getFullYear()),
  registrationPlate: z.string(),
});
