import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Put,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common'

import { UserService } from './user.service'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InmutableAdminGuard } from './guards/inmutable.guard'
import { Public } from '../auth/decorators/jwt.decorator'
import { SelfGuard } from './guards/self.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  async getUsers(@Res() res): Promise<User[]> {
    try {
      const users = await this.userService.findAll()

      return res.status(HttpStatus.OK).json(users)
    } catch (err) {
      return res.status(err.status).json(err.response)
    }
  }

  @Public()
  @Post()
  async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.create(createUserDto)

    return res.status(HttpStatus.OK).json(user)
  }

  @UseGuards(SelfGuard, InmutableAdminGuard)
  @Put('/:id')
  async updateUser(
    @Res() res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto)
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        updatedUser,
      })
    } catch (err) {
      return res.status(err.status).json(err.response)
    }
  }

  @UseGuards(SelfGuard)
  @Get('/:id')
  async getUser(@Res() res, @Param('id') id: string) {
    try {
      const user = await this.userService.find(id)
      return res.status(HttpStatus.OK).json(user)
    } catch (err) {
      return res.status(err.status).json(err.response)
    }
  }

  @UseGuards(InmutableAdminGuard, SelfGuard)
  @Delete('/:id')
  async deleteUser(@Res() res, @Param('id') id: string) {
    try {
      const deletedUser = await this.userService.delete(id)
      return res.status(HttpStatus.OK).json(deletedUser)
    } catch (err) {
      return res.status(err.status).json(err.response)
    }
  }
}
