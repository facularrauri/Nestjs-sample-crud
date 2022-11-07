import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RoleDocument = HydratedDocument<Role>

@Schema({ timestamps: true })
export class Role {
  @Prop(
    raw({
      english: { type: String, required: true, index: true, unique: true },
      spanish: { type: String, required: true, index: true, unique: true },
    }),
  )
  name: Record<string, any>
}

export const RoleSchema = SchemaFactory.createForClass(Role)
