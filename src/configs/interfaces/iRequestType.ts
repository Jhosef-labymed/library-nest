import { Request } from 'express';

export interface RequestTyped<Body = any, Params = any, Query = any>
  extends Request<Params, any, Body, Query> {
}
