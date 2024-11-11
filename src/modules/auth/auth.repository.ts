import { AppDataSource } from '@config/database';
import User from './auth.entity';

class AuthRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: {email}, select: ['password', 'id', 'email'] });
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(email: string, password: string) {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }
}

export default new AuthRepository();
