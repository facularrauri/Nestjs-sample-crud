import { Document } from 'mongoose'

export interface Role extends Document {
  readonly _id: string
  readonly name: {
    english: string
    spanish: string
  }
  readonly createdAt: Date
  readonly updatedAt: Date
}
