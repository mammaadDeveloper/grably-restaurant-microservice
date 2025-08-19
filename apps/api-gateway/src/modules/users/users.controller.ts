import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<unknown> {
    return this.usersService.findAll();
  }

  @Get('by-phone/:phone')
  async findByPhone(@Param('phone') phone: string): Promise<unknown> {
    return this.usersService.findByPhone(phone);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<unknown> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<unknown> {
    return this.usersService.create(body.phone, body.password);
  }

  @Patch()
  async update(@Body() body: UpdateUserDto): Promise<unknown> {
    return this.usersService.update(body.id, body.data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<unknown> {
    return this.usersService.delete(id);
  }
}
