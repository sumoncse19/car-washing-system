import { BookingModel } from './booking.model'
import { IBooking } from './booking.interface'
import { SlotModel } from '../slot/slot.model'

const createBookingIntoDB = async (
  bookingData: IBooking,
): Promise<IBooking> => {
  const booking = new BookingModel(bookingData)

  const existingBooking = await BookingModel.findOne({
    slot: bookingData.slot,
  })
  if (existingBooking) {
    throw new Error('Slot is already booked')
  }

  const newBookedSlot = await SlotModel.findOne({
    _id: bookingData.slot,
    service: bookingData.service,
  })
  if (newBookedSlot) {
    newBookedSlot.isBooked = 'booked'
    await newBookedSlot.save()

    const createdBooking = await booking.save()

    const Booking = await (
      await (await createdBooking.populate('customer')).populate('service')
    ).populate('slot')

    return Booking
  } else {
    throw new Error('Please ensure your slotId and serviceId is correct!')
  }
}

const getAllBookingsFromDB = async (): Promise<IBooking[]> => {
  return await BookingModel.find().populate('customer service slot')
}

const getUserBookingsFromDB = async (userId: string): Promise<IBooking[]> => {
  return await BookingModel.find({ customer: userId }).populate('service slot')
}

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
}
