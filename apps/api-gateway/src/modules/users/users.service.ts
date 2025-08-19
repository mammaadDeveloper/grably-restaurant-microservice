import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { UpdateUserDataDto } from './dto/update.dto';

export interface User {
  phone: string;
  password: string;
  createdAt: string;
}

export interface UsersServiceClient {
  findAll(): Observable<{ users: User[] }>;
  findById(data: { id: string }): Observable<{ user: User }>;
  findByPhone(data: { phone: string }): Observable<{ user: User }>;
  create(data: { phone: string; password: string }): Observable<{ user: User }>;
  update(data: {
    id: string;
    data: User | UpdateUserDataDto;
  }): Observable<{ success: boolean; user: User }>;
  delete(data: { id: string }): Observable<{ success: boolean }>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient | undefined;
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>('UsersService');
  }

  async findAll(): Promise<{ users: User[] }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.findAll());
    } catch (err) {
      this.logger.error('Failed to find all users.', err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }

  async findById(id: string): Promise<{ user: User }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.findById({ id }));
    } catch (err) {
      this.logger.error(`Failed to find user by id: ${id}`, err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }

  async findByPhone(phone: string): Promise<{ user: User }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.findByPhone({ phone }));
    } catch (err) {
      this.logger.error(`Failed to find user by phone: ${phone}`, err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }

  async create(
    phone: string,
    password: string,
  ): Promise<{ user: User }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.create({ phone, password }));
    } catch (err) {
      this.logger.error('Failed to create user.', err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }

  async update(
    id: string,
    data: User | UpdateUserDataDto,
  ): Promise<{ success: boolean; user: User }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.update({ id, data }));
    } catch (err) {
      this.logger.error(`Failed to update user: ${id}`, err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      if (!this.usersService) {
        throw new InternalServerErrorException('UsersService is not initialized.');
      }
      return await lastValueFrom(this.usersService.delete({ id }));
    } catch (err) {
      this.logger.error(`Failed to delete user: ${id}`, err);
      throw new InternalServerErrorException(
        'Failed to connect to users service.',
      );
    }
  }
}
