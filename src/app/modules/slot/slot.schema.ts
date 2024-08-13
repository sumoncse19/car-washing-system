import { Types } from "mongoose";
import { z } from "zod";

export const slotSchema = z.object({
  service: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid service ID",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid start time format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid end time format"),
  isBooked: z.enum(["available", "booked", "canceled"]).optional(),
});

// To validate data:
export type SlotInput = z.infer<typeof slotSchema>;
