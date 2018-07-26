import { Injectable } from '@nestjs/common';
import { InstanceType } from 'typegoose';

import { User, UserModel } from '../user.entity';

@Injectable()
export class UserService {
  async findAll(filter = {}): Promise<InstanceType<User>[]> {
    return UserModel.find(filter).sort('field username');
  }
}
