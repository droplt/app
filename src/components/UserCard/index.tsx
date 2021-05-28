import React from 'react';
import { useTranslation } from 'react-i18next';

import { format, FORMAT_P, formatDistanceToNow } from '../../helpers/date';
import Card from '../common/Card';
import Text from '../common/Text';
import { Props } from './types';

const UserCard: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const { username, role, createdAt, connectedAt } = user;

  return (
    <Card>
      <div className="flex flex-col space-y-2">
        <Text size={2} weight="medium">
          {username} - {t(role)}
        </Text>
        <Text size={-1} level="secondary">
          Inscrit le {format(new Date(createdAt), FORMAT_P)}
        </Text>
        {connectedAt && (
          <Text size={-1} weight="light" level="light">
            Dernière connexion il y a{' '}
            {formatDistanceToNow(new Date(connectedAt))}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
