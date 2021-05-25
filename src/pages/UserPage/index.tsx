import { Link } from 'react-router-dom';

import { useAuth } from '../../helpers/auth';

const UserPage = () => {
  const { signOut, user } = useAuth();

  return (
    <div>
      <Link className="text-crayola" to="/profile">
        Profile page - {user?.username || user?.email}
      </Link>
      <br />
      <button className="text-crayola" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default UserPage;
