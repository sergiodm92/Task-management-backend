import { Request, Response, RequestHandler } from 'express';
import AuthService from './auth.service';
import { successResponse, errorResponse } from '@utils/responseTemplates';

class AuthController {
  // Method to register a new user
  register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const newUser = await AuthService.register(email, password);
      const { password: _, ...userWithoutPassword } = newUser;

      // Response with status code 201
      res.status(201).json(successResponse('User created successfully', userWithoutPassword, 201));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Response with status code 400
      res.status(400).json(errorResponse(errorMessage, null, 400));
    }
  };

  // Method to login a user
  login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);

      // Response with status code 200
      res.status(200).json(successResponse('Login successful', token, 200));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // Response with status code 401
      res.status(401).json(errorResponse(errorMessage, null, 401));
    }
  };
}

export default new AuthController();
