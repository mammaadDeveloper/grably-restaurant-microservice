import { Query } from "@nestjs/cqrs";
import { UsersEntity } from "../../../domain/users.entity";

export class FindUserByIdQuery extends Query<UsersEntity | null>{
  constructor(public readonly id: string){
    super();
  }
}

export class FindUserByPhoneQuery extends Query<UsersEntity | null>{
  constructor(public readonly phone: string){
    super();
  }
}
