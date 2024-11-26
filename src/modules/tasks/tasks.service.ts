import TasksRepository from './tasks.repository';
import { Task } from './tasks.entity';
import tagsRepository from '@modules/tags/tags.repository';
import authRepository from '@modules/auth/auth.repository';
import { PaginatedTasksResult } from './types';
import createError from 'http-errors';

class TasksService {
  // Find all tasks
  async findAll(): Promise<Task[]> {
    return TasksRepository.findAll();
  }

  // Find a task by id
  async findById(id: number): Promise<Task | null> {
    if (!id || isNaN(id)) throw new createError.BadRequest('Invalid task ID');
    const task = await TasksRepository.findById(id);
    if (!task) throw new createError.NotFound('Task not found');
    return task;
  }

  // Find all tasks by user
  async findTasksByUser(userId: number): Promise<Task[]> {
    if (!userId || isNaN(userId)) throw new createError.BadRequest('Invalid user ID');
    return TasksRepository.findByUserId(userId);
  }

  async findTasksByUserPaginated(
    userId: number,
    page: number,
    limit: number
  ): Promise<PaginatedTasksResult> {
    if (!userId || isNaN(userId)) throw new createError.BadRequest('Invalid user ID');
    if (page <= 0 || limit <= 0) throw new createError.BadRequest('Invalid pagination parameters');

    const offset = (page - 1) * limit;

    const { tasks, totalTasks, taskCountsByState } = await TasksRepository.findAndCountByUserId(
      userId,
      offset,
      limit
    );

    tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { tasks, totalTasks, taskCountsByState };
  }

  // Find tasks by tags with pagination
  async findTasksByTagsPaginated(
    tags: number[],
    status: string,
    userId: number,
    page: number,
    limit: number
  ): Promise<{ tasks: Task[]; totalTasks: number }> {
    if (page <= 0 || limit <= 0) throw new createError.BadRequest('Invalid pagination parameters');

    const offset = (page - 1) * limit;
    return TasksRepository.findAndCountByTagsAndStatus(tags, status, userId, offset, limit);
  }

  async findTasksByTags(tags: number[], userId: number): Promise<Task[]> {
    return TasksRepository.findByTags(tags, userId);
  }

  // Create a new task
  async create(taskData: { userId: number; tags?: number[] } & Partial<Task>): Promise<Omit<Task, 'user'>> {
    const { userId, tags: tagIds = [], ...taskDataWithoutRelations } = taskData;

    // Validate user
    const user = await authRepository.findById(userId);
    if (!user) throw new createError.NotFound('User not found');

    // Validate tags
    const tags = tagIds.length > 0 ? await tagsRepository.findByIds(tagIds) : [];
    if (tags.length !== tagIds.length) throw new createError.NotFound('One or more tags not found');

    // Create task with relations
    const taskWithRelations = { ...taskDataWithoutRelations, tags, user };
    const response = await TasksRepository.create(taskWithRelations);

    // Remove sensitive fields from response
    const { user: _, ...responseWithoutUser } = response;
    return responseWithoutUser;
  }

  // Update a task
  async update(id: number, taskData: Partial<Task>): Promise<Task | null> {
    if (!id || isNaN(id)) throw new createError.BadRequest('Invalid task ID');
    const task = await TasksRepository.findById(id);
    if (!task) throw new createError.NotFound('Task not found');

    await TasksRepository.update(id, taskData);
    return this.findById(id);
  }

  // Delete a task
  async delete(id: number): Promise<void> {
    if (!id || isNaN(id)) throw new createError.BadRequest('Invalid task ID');
    const task = await TasksRepository.findById(id);
    if (!task) throw new createError.NotFound('Task not found');

    await TasksRepository.delete(id);
  }
}

export default new TasksService();
