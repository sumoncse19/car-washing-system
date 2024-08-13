import { Schema, model } from "mongoose";
import { ISlot } from "./slot.interface";

const slotSchema = new Schema<ISlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export const SlotModel = model<ISlot>("Slot", slotSchema);
