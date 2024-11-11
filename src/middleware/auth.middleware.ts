import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Get the token from the authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Response specific when the token has expired
      res.status(403).json({ message: 'Token has expired' });
    } else {
      // Response for an invalid token
      res.status(401).json({ message: 'Invalid token' });
    }
    return;
  }
};

export default authMiddleware;
