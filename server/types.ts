import { Request } from 'express';
import * as admin from 'firebase-admin';

export type AuthUser = admin.auth.UserRecord;

export interface Context {
  user?: AuthUser;
  req: Request;
}
