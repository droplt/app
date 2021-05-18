import { Request } from 'express';
import * as admin from 'firebase-admin';

export interface Context {
  user?: admin.auth.UserRecord;
  req: Request;
}
