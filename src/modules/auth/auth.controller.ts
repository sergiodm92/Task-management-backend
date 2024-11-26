import { Request, Response, NextFunction, RequestHandler } from 'express';
import AuthService from './auth.service';
import { successResponse } from '@utils/responseTemplates';

class AuthController {
  login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json(successResponse('Login successful', { token, user }, 200));
    } catch (error) {
      next(error); 
    }
  };

  register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const newUser = await AuthService.register(email, password);
      res.status(201).json(successResponse('User registered successfully', newUser, 201));
    } catch (error) {
      next(error); 
    }
  };

  getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await AuthService.getUser(Number(id));
      res.status(200).json(successResponse('User retrieved successfully', user, 200));
    } catch (error) {
      next(error); 
    }
  };
}

export default new AuthController();
