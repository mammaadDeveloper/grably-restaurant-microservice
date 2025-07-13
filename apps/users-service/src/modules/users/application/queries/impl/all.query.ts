import { Query } from "@nestjs/cqrs";
import { UsersEntity } from "../../../domain/users.entity";

export class FindAllUserQuery extends Query<UsersEntity[] | null>{}
