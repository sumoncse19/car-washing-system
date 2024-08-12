import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ServiceModel = model<IService>("Service", ServiceSchema);
