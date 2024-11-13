import TasksRepository from './tasks.repository';
import { Task } from './tasks.entity';
import tagsRepository from '@modules/tags/tags.repository';
import authRepository from '@modules/auth/auth.repository';

class TasksService {

  // Find all tasks
  findAll(): Promise<Task[]> {
    return TasksRepository.findAll();
  }

  // Find a task by id
  findById(id: number): Promise<Task | null> {
    return TasksRepository.findById(id);
  }

  // Find all tasks by user
  findTasksByUser(userId: number): Promise<Task[]> {
    return TasksRepository.findByUserId(userId);
  }

  // Find all tasks by tags
  findTasksByTags(tags: number[], userId: number): Promise<Task[]> {
    return TasksRepository.findByTags(tags, userId);
  }

  // Create a new task
  async create(taskData: { userId: number; tags?: number[] } & Partial<Task>): Promise<Task> {
    const { userId, tags: tagIds = [], ...taskDataWithoutRelations } = taskData;

    const user = await authRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const tags = tagIds.length > 0 ? await tagsRepository.findByIds(tagIds) : [];
    if (tags.length !== tagIds.length) throw new Error('One or more tags not found');

    const taskWithRelations = { ...taskDataWithoutRelations, tags };
    return TasksRepository.create(taskWithRelations);
  }

  // Update a task
  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const task = await TasksRepository.findById(id);
    if (!task) throw new Error('Task not found');
    
    await TasksRepository.update(id, taskData);
    return this.findById(id);
  }

  // Delete a task
  delete(id: number): Promise<void> {
    return TasksRepository.delete(id).then(() => {});
  }
}

export default new TasksService();
