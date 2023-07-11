import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateZod =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check schema
      await zodSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      // go to next
      return next();
    } catch (error) {
      next(error);
    }
  };
