import { Link } from 'react-router-dom';

import { useAuth } from '../../helpers/auth';

const UserPage = () => {
  const { user, token, signOut } = useAuth();

  return (
    <div>
      <Link className="text-blue-700" to="/profile">
        Profile page - {user?.uid}
        {token}
      </Link>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default UserPage;
