import React from 'react';

import { AuthUserQuery } from '../../graphql/types';

export const AuthUserContext =
  React.createContext<AuthUserQuery | undefined>(undefined);
