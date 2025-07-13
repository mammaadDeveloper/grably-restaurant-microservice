import { Command } from "@nestjs/cqrs";
import { UpdateResult } from "typeorm";
import { UpdateUserDto } from "../../../dto/update.dto";

export class UpdateUserCommand extends Command<UpdateResult>{
  constructor(
    public readonly id: string,
    public readonly data: UpdateUserDto,
  ){
    super();
  }
}
