import { NextFunction, Request, Response } from 'express';

import admin from '../../services/firebase';
import { AUTH_COOKIE, AUTH_EXPIRES } from './constants';

export const session = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token = '' } = req;
  const sessionCookie = await admin
    .auth()
    .createSessionCookie(token, { expiresIn: AUTH_EXPIRES });
  res.cookie(AUTH_COOKIE, sessionCookie, {
    maxAge: AUTH_EXPIRES,
    httpOnly: true,
    secure: true,
  });
  res.end();
};
