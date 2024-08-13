import { SlotModel } from "./slot.model";
import { ServiceModel } from "../service/service.model";
import { ISlot } from "./slot.interface";

const createSlotsIntoDB = async (
  service: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<ISlot[]> => {
  const serviceData = await ServiceModel.findById(service);
  if (!serviceData) {
    throw new Error("Service not found");
  }

  const serviceDuration = serviceData.duration;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / serviceDuration;

  const slots: ISlot[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * serviceDuration;
    const slotEndMinutes = slotStartMinutes + serviceDuration;

    const slotStartHour = Math.floor(slotStartMinutes / 60);
    const slotStartMinute = slotStartMinutes % 60;
    const slotEndHour = Math.floor(slotEndMinutes / 60);
    const slotEndMinute = slotEndMinutes % 60;

    slots.push({
      service,
      date,
      startTime: `${slotStartHour.toString().padStart(2, "0")}:${slotStartMinute.toString().padStart(2, "0")}`,
      endTime: `${slotEndHour.toString().padStart(2, "0")}:${slotEndMinute.toString().padStart(2, "0")}`,
      isBooked: "available",
    } as unknown as ISlot);
  }

  const createdSlots = await SlotModel.insertMany(slots);
  return createdSlots;
};

const getAvailableSlotsFromDB = async (
  date?: string,
  service?: string
): Promise<ISlot[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = { isBooked: "available" };

  if (date) {
    query.date = date;
  }

  if (service) {
    query.service = service;
  }

  const AvailableSlot = await SlotModel.find(query).populate("service");

  return AvailableSlot;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
};
