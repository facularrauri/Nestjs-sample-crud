import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateTokenDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
