import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { hash, compare } from 'bcrypt'
import { Role } from '../../role/interfaces/role.interface'

export type UserDocument = mongoose.HydratedDocument<User>

@Schema({
  timestamps: true,
  methods: {
    async validatePassword(
      this: UserDocument,
      candidatePassword: string,
    ): Promise<boolean> {
      const hashedPassword = this.password
      const isMatched = await compare(candidatePassword, hashedPassword)
      return isMatched
    },
  },
})
export class User {
  @Prop({ type: String, required: true, lowercase: true, trim: true })
  name: string

  @Prop({ type: String, required: true, lowercase: true, trim: true })
  email: string

  @Prop({
    type: String,
    required: true,
    trim: true,
    select: false,
  })
  password: string

  @Prop({ type: Date })
  birthdate?: string

  @Prop({ type: String, lowercase: true, trim: true })
  country?: string

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    validate: (v) => v === null || v.length > 0,
  })
  roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
  const hashedPassword = await hash(this.password, 10)
  this.password = hashedPassword
  next()
})
