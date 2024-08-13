import { IService } from './service.interface'
import { ServiceModel } from './service.model'

const createServiceIntoDB = async (serviceData: IService) => {
  const service = new ServiceModel(serviceData)
  return await service.save()
}

const getServiceByIdFromDB = async (id: string) => {
  return await ServiceModel.findById(id)
}

const getAllServicesFromDB = async () => {
  return await ServiceModel.find({ isDeleted: false })
}

const updateServiceInDB = async (id: string, updateData: Partial<IService>) => {
  const serviceExist = await ServiceModel.findById(id)
  if (!serviceExist) {
    throw new Error('Service not found')
  }

  return await ServiceModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
}

const softDeleteServiceInDB = async (id: string) => {
  const service = await ServiceModel.findById(id)

  if (!service) {
    throw new Error('Service not found')
  }

  if (service.isDeleted) {
    return { message: 'This service you already deleted earlier!', service }
  }

  service.isDeleted = true
  await service.save()

  return { message: 'Service deleted successfully', service }
}

export const ServiceServices = {
  createServiceIntoDB,
  getServiceByIdFromDB,
  getAllServicesFromDB,
  updateServiceInDB,
  softDeleteServiceInDB,
}
