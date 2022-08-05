import { Request } from 'express';

export interface TypedRequest<T = any> extends Request {
  body: T;
}
