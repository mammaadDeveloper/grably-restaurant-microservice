import { IsNotEmpty, IsNumberString, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumberString()
  phone!: string;

  @IsNotEmpty()
  @Min(8)
  password!: string;
}
