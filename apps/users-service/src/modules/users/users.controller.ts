/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @GrpcMethod('UsersService', 'FindAll')
  async findAll() {}
}
