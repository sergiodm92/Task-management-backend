import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from './auth.repository';
import envs from '@config/envs';

class AuthService {
  // Method to register a new user
  async register(email: string, password: string) {

    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    return await AuthRepository.createUser(email, hashedPassword);
  }

  // Method to login and get a JWT token
  async login(email: string, password: string) {

    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, envs.JWT_SECRET, {
      expiresIn: envs.JWT_EXPIRES_IN,
    });

    return { token };
  }
}

export default new AuthService();
