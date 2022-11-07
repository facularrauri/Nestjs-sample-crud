import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common'

import { AuthService } from './auth.service'
import { Auth } from './interfaces/auth.interface'
import { CreateTokenDto } from './dto/create-token.dto'
import { Public } from './decorators/jwt.decorator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Res() res,
    @Body() createTokenDto: CreateTokenDto,
  ): Promise<Auth> {
    const token = await this.authService.createToken(createTokenDto)

    return res.status(HttpStatus.OK).json(token)
  }
}
