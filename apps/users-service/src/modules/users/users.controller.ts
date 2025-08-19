import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './infrastructure';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod('UsersService', 'FindAll')
  async findAll() {
    const users = await this.service.findAll();

    return {
      users,
    };
  }

  @GrpcMethod('UsersService', 'FindById')
  async findById(data: { id: string }) {
    const user = await this.service.find(data.id);

    return {
      user,
    };
  }

  @GrpcMethod('UserService', 'FindByPhone')
  async findByPhone(data: { phone: string; password: string }) {
    const user = await this.service.create(data);

    return { user };
  }

  @GrpcMethod('UsersService', 'Create')
  async create(data: { phone: string; password: string }) {
    const user = await this.service.create(data);

    return { user };
  }

  @GrpcMethod('UsersService', 'Update')
  async update(data: { id: string; data: never }) {
    const result = await this.service.update(data.id, data.data);
    const user = await this.service.find(data.id);

    return {
      success: result.affected !== 0,
      user,
    };
  }

  @GrpcMethod('UsersService', 'Delete')
  async delete(data: { id: string }) {
    const result = await this.service.delete(data.id);

    return {
      success: result.affected !== 0,
    };
  }
}
