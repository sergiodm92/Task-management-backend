import { AppDataSource } from '@config/database';
import { Repository, In } from 'typeorm';
import { Task } from './tasks.entity';
import { Tag } from '@modules/tags/tags.entity';

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

  async findAndCountByUserId(userId: number, offset: number, limit: number): Promise<[Task[], number]> {
    return this.repo.findAndCount({
      where: { user: { id: userId } },
      relations: ['tags'],
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  findByTags(tags: number[], userId: number) {
    return this.repo.find({ where: { tags: { id: In(tags) }, user: { id: userId } } });
  }

  async findAndCountByTagsAndStatus(
    tags: number[],
    status: string,
    userId: number,
    offset: number,
    limit: number
  ): Promise<{ tasks: Task[], totalTasks: number }> {
    // Crear el query builder para la tabla 'task'
    const queryBuilder = this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.tags', 'tag')
      .where('task.userId = :userId', { userId });
  
    // Condiciones para los filtros
    if (tags.length > 0 && status) {
      // Si hay tags y status
      queryBuilder
        .andWhere('tag.id IN (:...tags)', { tags })
        .andWhere('task.status = :status', { status });
    } else if (tags.length > 0) {
      // Si solo hay tags
      queryBuilder.andWhere('tag.id IN (:...tags)', { tags });
    } else if (status) {
      // Si solo hay status
      queryBuilder.andWhere('task.status = :status', { status });
    }
  
    // Ejecutar el query con paginación y ordenar por fecha de creación
    const [tasks, totalTasks] = await queryBuilder
      .skip(offset)
      .take(limit)
      .orderBy('task.createdAt', 'DESC')
      .getManyAndCount();
  
    return { tasks, totalTasks };
  }

  create(taskData: Partial<Task>) {
    const task = this.repo.create(taskData);
    return this.repo.save(task);
  }

  async update(id: number, taskData: Partial<Task>) {
    const task = await this.repo.findOne({ where: { id }, relations: ['tags'] });
    if (!task) throw new Error('Task not found');

    Object.assign(task, taskData);

    if (taskData.tags) {
      const tagsRepository = AppDataSource.getRepository(Tag);
      const updatedTags = await tagsRepository.findBy({ id: In(taskData.tags.map(tag => tag)) });
      task.tags = updatedTags;
    }
    return this.repo.save(task);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export default new TasksRepository();
