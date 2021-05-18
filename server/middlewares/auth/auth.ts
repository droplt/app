import { NextFunction, Request, Response } from 'express';

import admin from '../../services/firebase';
import { AUTH_COOKIE } from './constants';

export const auth = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token = '', cookies } = req;
  const sessionCookie = cookies[AUTH_COOKIE];
  try {
    const { uid } = await decodeToken(sessionCookie || token, !!sessionCookie);
    const user = await admin.auth().getUser(uid);
    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).send();
  }
};

const decodeToken = async (token: string, isSessionCookie: boolean) => {
  if (isSessionCookie) {
    return admin.auth().verifySessionCookie(token, true);
  }
  return await admin.auth().verifyIdToken(token);
};
