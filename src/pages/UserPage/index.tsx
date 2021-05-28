import React from 'react';

import UserCard from '../../components/UserCard';
import { useAuth } from '../../helpers/auth';
const UserPage: React.FC = () => {
  const { user } = useAuth();

  return <div>{user && <UserCard user={user} />}</div>;
};

export default UserPage;
