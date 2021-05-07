import { Link } from 'react-router-dom';

const UserPage = () => {
  return (
    <div>
      <Link className="text-blue-700" to="/profile">
        Profile page
      </Link>
    </div>
  );
};

export default UserPage;
