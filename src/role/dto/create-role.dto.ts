import { IsString, IsNotEmpty, ValidateNested } from 'class-validator'

class Name {
  @IsNotEmpty()
  @IsString()
  english: string

  @IsNotEmpty()
  @IsString()
  spanish: string
}

export class CreateRoleDto {
  @ValidateNested()
  @IsNotEmpty()
  name: Name
}
