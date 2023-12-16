import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as string;
    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      const user = verify(token, process.env.SECRET);
      res.locals.user = user;
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }

    next();
  }
}
