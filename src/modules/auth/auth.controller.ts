import { Request, Response, NextFunction, RequestHandler } from 'express';
import AuthService from './auth.service';
import { successResponse } from '@utils/responseTemplates';
import { successMessage } from '@enums/success.enum';

class AuthController {
  login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      successResponse(res,successMessage.login, { token, user }, 200)
    } catch (error) {
      next(error); 
    }
  };

  register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const newUser = await AuthService.register(email, password);
      successResponse(res, successMessage.userCreated, newUser, 201);
    } catch (error) {
      next(error); 
    }
  };

  getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await AuthService.getUser(Number(id));
      successResponse(res, successMessage.getUser, user, 200);
    } catch (error) {
      next(error); 
    }
  };
}

export default new AuthController();
