interface UserProp {
  username: string;
  role: string;
  createdAt: string;
  connectedAt?: string;
}

export interface Props {
  user: UserProp;
}
