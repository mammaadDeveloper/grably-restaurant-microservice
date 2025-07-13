import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 64)
  password!: string;
}
