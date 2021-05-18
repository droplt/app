import { Arg, Query, Resolver } from 'type-graphql';

import { toUserModel, UserModel } from '../entities';
import admin from '../services/firebase';

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  async user(@Arg('uid') uid: string): Promise<UserModel> {
    const user = await admin.auth().getUser(uid);
    return toUserModel(user);
  }

  @Query(() => [UserModel])
  async users() {
    const list = await admin.auth().listUsers(1000);
    return list.users.map(toUserModel);
  }
}
