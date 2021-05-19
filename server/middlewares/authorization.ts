import { AuthChecker } from 'type-graphql';

import { USER_ROLES } from '../constants';
import { Context } from '../types';

export const authorization: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  // Retrieve user roles from customClaims
  const userRoles = Object.keys(context.user?.customClaims || {});

  // Administrators can access everything
  if (userRoles.includes(USER_ROLES.ADMIN)) {
    return true;
  }

  // Contributors can access everything visitors can
  if (
    userRoles.includes(USER_ROLES.CONTRIBUTOR) &&
    !roles.includes(USER_ROLES.ADMIN)
  ) {
    return true;
  }

  // Check user has every roles required
  return roles.every((role) => userRoles.includes(role));
};
