import { BookingModel } from "./booking.model";
import { IBooking } from "./booking.interface";

const createBookingIntoDB = async (
  bookingData: IBooking
): Promise<IBooking> => {
  const booking = new BookingModel(bookingData);

  const existingBooking = await BookingModel.findOne({
    slot: bookingData.slotId,
  });
  if (existingBooking) {
    throw new Error("Slot is already booked");
  }

  const createdBooking = await booking.save();

  const Booking = await (
    await (await createdBooking.populate("customerId")).populate("serviceId")
  ).populate("slotId");

  return Booking;
};

const getAllBookingsFromDB = async (): Promise<IBooking[]> => {
  return await BookingModel.find().populate("customerId serviceId slotId");
};

const getUserBookingsFromDB = async (userId: string): Promise<IBooking[]> => {
  return await BookingModel.find({ customerId: userId }).populate(
    "serviceId slotId"
  );
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
