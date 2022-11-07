import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user/schemas/user.schema'
import { Role } from '../role/schemas/role.schema'
import { Seeder } from 'nestjs-seeder'

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel('User') private readonly user: Model<User>,
    @InjectModel('Role') private readonly role: Model<Role>,
  ) {}

  async seed(): Promise<any> {
    const { _id } = await this.role.findOne({ 'name.english': 'admin' })
    const admin = {
      name: 'admin',
      email: 'admin@admin.com',
      password: '$2b$10$h6qfw5bxarmjo33pkpcceujaigtxf3la1docaolx9e2e7qaqvcska', //Password1 hash
      roles: [_id],
    }

    const users = [admin]

    return this.user.insertMany(users)
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({})
  }
}
