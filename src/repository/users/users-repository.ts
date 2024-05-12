import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { User, UsersDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) model: Model<UsersDocument>) {
    super(model);
  }

  async findById(id: Types.ObjectId) {
    return await this.model.findById(id).exec();
  }

  async findOne(key: string, value: any) {
    const query = {
      [key]: value,
    };

    return await this.model.findOne(query).exec();
  }

  async create(name: string, email: string, password: string, role: string) {
    return await this.model.create({
      name,
      email,
      password,
      role,
    });
  }
}
