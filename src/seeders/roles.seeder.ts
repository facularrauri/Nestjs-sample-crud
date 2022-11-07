import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Role } from '../role/schemas/role.schema'
import { Seeder } from 'nestjs-seeder'

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(@InjectModel('Role') private readonly role: Model<Role>) {}

  async seed(): Promise<any> {
    const roles = [
      {
        name: {
          english: 'admin',
          spanish: 'admin',
        },
      },
      {
        name: {
          english: 'employee',
          spanish: 'empleado',
        },
      },
    ]

    return this.role.insertMany(roles)
  }

  async drop(): Promise<any> {
    return this.role.deleteMany({})
  }
}
