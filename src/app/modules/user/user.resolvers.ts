import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './services/user.service';

@Resolver('User')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async getUsers(obj, args, context, info): Promise<any> {
    console.log(obj, context, info);
    return this.userService.findAll({ team: args.team });
  }

  @Query()
  async devs(): Promise<any> {
    return this.userService.findAll({
      role: {
        $in: ['developer'],
      },
    });
  }

}