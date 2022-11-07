import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common'

import { Roles } from './decorators/roles.decorator'
import { RolesGuard } from './guards/roles.guard'

import { RoleService } from './role.service'
import { Role } from './interfaces/role.interface'
import { CreateRoleDto } from './dto/create-role.dto'
import { Public } from 'src/auth/decorators/jwt.decorator'

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Public()
  @Get()
  async getRoles(@Res() res): Promise<Role[]> {
    const roles = await this.roleService.findAll()

    return res.status(HttpStatus.OK).json(roles)
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async createRole(@Res() res, @Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto)

    return res.status(HttpStatus.OK).json(role)
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async deleteRole(@Res() res, @Param('id') id: string) {
    try {
      const deletedRole = await this.roleService.delete(id)
      return res.status(HttpStatus.OK).json(deletedRole)
    } catch (err) {
      return res.status(err.status).json(err.response)
    }
  }
}
