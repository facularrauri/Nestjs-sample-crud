import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Model } from 'mongoose'
import { User, IUserModel } from '../user/interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTokenDto } from './dto/create-token.dto'
import { Auth } from './interfaces/auth.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private user: Model<User & IUserModel>,
  ) {}

  async createToken(createTokenDto: CreateTokenDto): Promise<Auth> {
    const user = await this.user
      .findOne({ email: createTokenDto.email }, '+password')
      .populate('roles')

    if (!user) {
      throw new NotFoundException()
    }

    const result = await user.validatePassword(createTokenDto.password)

    if (!result) {
      throw new UnauthorizedException()
    }

    const payload = {
      roles: user.roles.map((r) => r.name),
    }

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '6h',
        subject: user._id.toString(),
      }),
    }
  }
}
