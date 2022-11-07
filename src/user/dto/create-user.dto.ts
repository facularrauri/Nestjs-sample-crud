import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsDate()
  birthdate: Date

  @IsOptional()
  @IsString()
  country: string
}
