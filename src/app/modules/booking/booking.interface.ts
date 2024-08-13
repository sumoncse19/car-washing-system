import { Types } from 'mongoose'
import { Vehicle } from './booking.enumeration'

export interface IBooking {
  customer: Types.ObjectId
  service: Types.ObjectId
  slot: Types.ObjectId
  vehicleType: Vehicle
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  createdAt?: Date
  updatedAt?: Date
}
