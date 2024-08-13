import { Document, Types } from 'mongoose'

export interface ISlot extends Document {
  service: Types.ObjectId
  date: string
  startTime: string
  endTime: string
  isBooked: 'available' | 'booked' | 'canceled'
  createdAt?: Date
  updatedAt?: Date
}
