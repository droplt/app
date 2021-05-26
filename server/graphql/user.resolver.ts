import { Arg, Query, Resolver } from 'type-graphql';

import { UserModel } from '../entities';
import { toUserModel } from '../helpers/user';
import admin from '../services/firebase';
import { AuthUser, AuthUserType } from './decorators';

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  async me(@AuthUser() authUser: AuthUserType): Promise<UserModel> {
    const user = await admin.auth().getUser(authUser.uid);
    return toUserModel(user);
  }

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
