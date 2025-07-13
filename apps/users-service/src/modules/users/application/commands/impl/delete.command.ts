import { Command } from "@nestjs/cqrs";
import { DeleteResult } from "typeorm";

export class DeleteUserCommand extends Command<DeleteResult> {
  constructor(public readonly id: string){
    super();
  }
}
