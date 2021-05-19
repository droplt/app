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
