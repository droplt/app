import { NextFunction, Request, Response } from 'express';
import { AuthChecker } from 'type-graphql';

import { ROLES } from '../constants';
import admin from '../services/firebase';
import { Context } from '../types';

/**
 * Authentication middleware
 *
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token = '' } = req;
    const { uid } = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(uid);
    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).send();
  }
};

/**
 * GraphQL authentication check
 *
 * @param { Context } context
 * @param { [string] } roles
 * @returns { boolean } Whether user can access data
 */
export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  const userRoles = Object.keys(context.user?.customClaims || {});

  // Administrators can access everything
  if (userRoles.includes(ROLES.ADMIN)) {
    return true;
  }

  // Contributors can access everything visitors can
  if (userRoles.includes(ROLES.CONTRIBUTOR) && !roles.includes(ROLES.ADMIN)) {
    return true;
  }

  return roles.every((role) => userRoles.includes(role));
};
