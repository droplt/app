import * as admin from 'firebase-admin';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  uid: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  isAdmin?: boolean;

  @Field({ nullable: true })
  isVerified?: boolean;

  @Field({ nullable: true })
  isDisabled?: boolean;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  connectedAt?: Date;

  @Field({ nullable: true })
  activeAt?: Date;
}

export const toUserModel = (firebaseUser: admin.auth.UserRecord): UserModel => {
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
