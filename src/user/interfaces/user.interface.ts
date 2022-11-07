import { Document, Model } from 'mongoose'
import { Role } from '../../role/interfaces/role.interface'
import { UserDocument } from '../schemas/user.schema'

export interface User extends Document {
  readonly _id: string
  readonly name: string
  readonly email: string
  readonly password: string
  readonly birthdate?: Date
  readonly country?: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly roles: Role[]
}

export interface IUserModel extends Model<UserDocument> {
  validatePassword: (
    candidatePassword: string,
  ) => Promise<UserDocument | undefined>
}
