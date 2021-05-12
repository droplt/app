import { Collection, getRepository } from 'fireorm';
import { Authorized, Field, ID, ObjectType } from 'type-graphql';

@Collection()
@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Authorized('ADMIN')
  @Field({ nullable: true })
  created_at?: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}

export const userRepository = getRepository(UserModel);
