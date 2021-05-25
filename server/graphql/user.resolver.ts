import { Arg, Query, Resolver } from 'type-graphql';

import { UserModel } from '../entities';
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

const toUserModel = (firebaseUser: admin.auth.UserRecord): UserModel => {
  const {
    uid,
    email,
    metadata,
    phoneNumber,
    customClaims,
    emailVerified,
    disabled,
    photoURL,
    displayName,
  } = firebaseUser;
  const { creationTime, lastSignInTime, lastRefreshTime } = metadata;
  const { admin = false } = customClaims || {};
  return {
    uid,
    email,
    phone: phoneNumber,
    isDisabled: disabled,
    username: displayName,
    avatarUrl: photoURL,
    isVerified: emailVerified,
    isAdmin: admin,
    createdAt: new Date(creationTime),
    connectedAt: new Date(lastSignInTime),
    activeAt: lastRefreshTime ? new Date(lastRefreshTime) : undefined,
  };
};
