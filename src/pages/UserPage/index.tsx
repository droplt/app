import { Link } from 'react-router-dom';

import { useAuth } from '../../helpers/auth';
import { useUserQuery } from './hooks';

const UserPage = () => {
  const { user, signOut } = useAuth();
  const { data } = useUserQuery();

  console.log(data);

  return (
    <div>
      <Link className="text-crayola" to="/profile">
        Profile page - {user?.uid}
      </Link>
      <br />
      <button className="text-crayola" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default UserPage;
