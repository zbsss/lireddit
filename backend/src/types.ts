import { Request, Response } from 'express';
import { Redis } from 'ioredis';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis
};
