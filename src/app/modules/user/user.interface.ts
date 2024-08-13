import { Email } from '../shared/common.types'
import { Roles } from '../shared/user.enumeration'

export interface IUser {
  name: string
  email: Email
  password: string
  phone: string
  role: Roles
  address: string
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}
