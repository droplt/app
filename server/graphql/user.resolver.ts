import { Arg, Query, Resolver } from 'type-graphql';

import { UserModel, userRepository } from '../entities';

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  async user(@Arg('id') id: string): Promise<UserModel> {
    return userRepository.findById(id);
  }
}
