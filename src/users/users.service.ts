import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersRepository } from 'src/repository/users';

@Injectable()
export class UsersService {
  constructor(protected readonly userRepository: UsersRepository) {}

  async findById(id: Types.ObjectId) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async findByEmail(value: any) {
    const user = await this.userRepository.findOne('email', value);
    return user;
  }

  async create(name: string, email: string, password: string, role: string) {
    return await this.userRepository.create(name, email, password, role);
  }
}
