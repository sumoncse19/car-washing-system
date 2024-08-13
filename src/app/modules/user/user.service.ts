import { IUser } from './user.interface'
import { UserModel } from './user.model'
import bcrypt from 'bcryptjs'
import { createToken } from '../../utils/jwt.utils'
import config from '../../config'

const registerUserIntoDB = async (userData: IUser) => {
  const existingUser = await UserModel.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const user = new UserModel({ ...userData, password: hashedPassword })
  await user.save()
  return user
}

const loginUserFromDB = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new Error('This user is deleted !')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )
  return {
    accessToken,
    refreshToken,
    user,
  }
}

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
}
