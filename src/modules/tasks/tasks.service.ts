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
  async findTasksByUser(userId: number): Promise<Task[]> {
    const tasks = await TasksRepository.findByUserId(userId);
    return tasks.sort((a: Task, b: Task) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findTasksByUserPaginated(userId: number, page: number, limit: number): Promise<{ tasks: Task[], totalTasks: number }> {
    // Calcular el índice inicial
    const offset = (page - 1) * limit;

    // Obtener las tareas paginadas y el total de tareas
    const [tasks, totalTasks] = await TasksRepository.findAndCountByUserId(userId, offset, limit);

    // Ordenar las tareas por fecha de creación (descendente)
    tasks.sort((a: Task, b: Task) => b.createdAt.getTime() - a.createdAt.getTime());

    return { tasks, totalTasks };
  }

  // Find all tasks by tags
  findTasksByTags(tags: number[], userId: number): Promise<Task[]> {
    return TasksRepository.findByTags(tags, userId);
  }

  // Create a new task
  async create(taskData: { userId: number; tags?: number[] } & Partial<Task>): Promise<Omit<Task, 'user'>> {
    const { userId, tags: tagIds = [], ...taskDataWithoutRelations } = taskData;

    // Validar usuario
    const user = await authRepository.findById(userId);
    if (!user) throw new Error('User not found');

    // Validar etiquetas
    const tags = tagIds.length > 0 ? await tagsRepository.findByIds(tagIds) : [];
    if (tags.length !== tagIds.length) throw new Error('One or more tags not found');

    // Crear tarea con relaciones
    const taskWithRelations = { ...taskDataWithoutRelations, tags, user };
    const response = await TasksRepository.create(taskWithRelations);

    // Remover el campo 'user' del objeto respuesta antes de devolverlo
    const { user: _, ...responseWithoutUser } = response;  // Omitimos 'user' en la respuesta final
    return responseWithoutUser;
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
    return TasksRepository.delete(id).then(() => { });
  }
}

export default new TasksService();
