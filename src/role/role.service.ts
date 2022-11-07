import { Model } from 'mongoose'
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './interfaces/role.interface'
import { roles } from './roles.enum'

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private role: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.role(createRoleDto)
    return createdRole.save()
  }

  async findAll(): Promise<Role[]> {
    return this.role.find().exec()
  }

  async delete(id: string): Promise<Role> {
    const role = await this.role.findById(id)
    if (!role) {
      throw new NotFoundException()
    }

    if (
      role.name.english === roles.ADMIN ||
      role.name.english === roles.EMPLOYEE
    ) {
      throw new ForbiddenException()
    }

    return role.remove()
  }
}
