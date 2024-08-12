import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Service description is required"),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
  isDeleted: z.boolean().optional(),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  isDeleted: z.boolean().optional(),
});
