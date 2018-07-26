import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolvers } from './user.resolvers';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, UserResolvers],
})
export class UserModule {}
