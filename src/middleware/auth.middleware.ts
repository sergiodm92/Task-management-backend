import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import createError from 'http-errors';
import { errorMessage } from '@enums/errors.enum';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Get the token from the authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new createError.Unauthorized(errorMessage.noToken);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Response specific when the token has expired
      throw new createError.Unauthorized(errorMessage.expiredToken);
    } else {
      // Response for an invalid token
      throw new createError.Unauthorized(errorMessage.invalidToken);
    }
  }
};

export default authMiddleware;
