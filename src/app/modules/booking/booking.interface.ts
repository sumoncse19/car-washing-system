import { Types } from "mongoose";
import { Vehicle } from "./booking.enumeration";

export interface IBooking {
  customerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: Vehicle;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
