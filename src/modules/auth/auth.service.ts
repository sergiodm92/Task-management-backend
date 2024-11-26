import createError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from './auth.repository';
import envs from '@config/envs';
import { errorMessage } from '@enums/errors.enum';

class AuthService {
  async register(email: string, password: string) {
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) {
      // Used http-errors to throw a 400 (Bad Request) error
      throw new createError.BadRequest(errorMessage.emailAlreadyExists);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthRepository.createUser(email, hashedPassword);
    const { password: userPassword, ...userWidthoutPassword } = newUser
    return userWidthoutPassword
  }

  async login(email: string, password: string) {
    
    const user = await AuthRepository.findUserByEmail(email);
    
    const isPasswordValid = user && await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new createError.Unauthorized(errorMessage.invalidCredentials); 
    }
    const token = jwt.sign({ id: user.id, email: user.email }, envs.JWT_SECRET, {
      expiresIn: envs.JWT_EXPIRES_IN,
    });

    return { token, user: { id: user.id, email: user.email } };
  }

  async getUser(id: number) {
    const user = await AuthRepository.findById(id);
    if (!user) {
      // Used http-errors to throw a 404 (Not Found) error
      throw new createError.NotFound(errorMessage.userNotFound);
    }
    return user;
  }
}

export default new AuthService();
