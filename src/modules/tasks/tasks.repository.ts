import { AppDataSource } from '@config/database';
import { Repository, In } from 'typeorm';
import { Task } from './tasks.entity';

class TasksRepository {
  private repo: Repository<Task>;

  constructor() {
    this.repo = AppDataSource.getRepository(Task);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByUserId(userId: number) {
    return this.repo.find({ where: { user: { id: userId } }, relations: ['tags'] });
  }

  findByTags(tags: string[], userId: number) {
    return this.repo.find({ where: { tags: { name: In(tags) }, user: { id: userId } } });
  }

  create(taskData: Partial<Task>) {
    const task = this.repo.create(taskData);
    return this.repo.save(task);
  }

  update(id: number, taskData: Partial<Task>) {
    return this.repo.update(id, taskData);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export default new TasksRepository();
