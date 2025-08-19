import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class UpdateUserDataDto {
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  data!: UpdateUserDataDto;
}
