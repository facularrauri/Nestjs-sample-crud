import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './interfaces/user.interface'
import { Role } from '../role/interfaces/role.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private user: Model<User>,
    @InjectModel('Role') private role: Model<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { _id } = await this.role.findOne({
      'name.english': 'employee',
    })

    const createdUser = new this.user({ ...createUserDto, roles: [_id] })
    return createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.user.find().populate('roles').exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.user.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    })

    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  async find(id: string): Promise<User> {
    const user = await this.user.findById(id).exec()
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  async delete(id: string): Promise<User> {
    const user = await this.user.findByIdAndDelete(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }
}
