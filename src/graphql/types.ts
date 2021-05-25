/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  me: UserModel;
  user: UserModel;
  users: Array<UserModel>;
};

export type QueryUserArgs = {
  uid: Scalars['String'];
};

export type UserModel = {
  avatarUrl: Scalars['String'];
  connectedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  isContributor: Scalars['Boolean'];
  isDisabled: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  isVisitor: Scalars['Boolean'];
  phone?: Maybe<Scalars['String']>;
  role: UserRole;
  uid: Scalars['ID'];
  username: Scalars['String'];
};

/** User role */
export enum UserRole {
  Admin = 'ADMIN',
  Contributor = 'CONTRIBUTOR',
  Visitor = 'VISITOR',
}

export type AuthUserQueryVariables = Exact<{ [key: string]: never }>;

export type AuthUserQuery = {
  me: Pick<UserModel, 'uid' | 'email' | 'username'>;
};
