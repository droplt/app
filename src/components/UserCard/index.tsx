import { format } from 'date-fns';

import Card from '../common/Card';
import Text from '../common/Text';
import { Props } from './types';

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <div className="flex flex-col space-y-2">
        <Text size={2} weight="medium">
          {user.username} - {user.role}
        </Text>
        <Text size={-1} level="secondary">
          Inscrit le {format(new Date(user.createdAt), 'P')}
        </Text>
        <Text size={-1} weight="light" level="light">
          Dernière connexion il y a 5 jours
        </Text>
      </div>
    </Card>
  );
};

export default UserCard;
