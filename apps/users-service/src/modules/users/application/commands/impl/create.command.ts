import { Command } from "@nestjs/cqrs";
import { UsersEntity } from "../../../domain/users.entity";
import { CreateUserDto } from "../../../dto/create.dto";

export class CreateUserCommand extends Command<UsersEntity | UsersEntity[]>{
  constructor(
    public readonly data: CreateUserDto
  ){
    super();
  }
}
