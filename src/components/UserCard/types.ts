import { UserRole } from '../../graphql/types';

interface UserProp {
  username: string;
  role: UserRole;
  createdAt: string;
  connectedAt?: string;
}

export interface Props {
  user: UserProp;
}
