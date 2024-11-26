import { NextFunction, Request, Response } from 'express';
import TasksService from './tasks.service';
import { successResponse, errorResponse } from '@utils/responseTemplates';

class TasksController {

  // Get all tasks
  async getAll(req: Request, res: Response): Promise<void> {
    const tasks = await TasksService.findAll();
    successResponse(res, 'Get all tasks successful', tasks, 200);
  }

  // Get all tasks by user
  async getUserTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = (req as any).user;

      // Get the page and limit parameters from the request query
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      // Call the findTasksByUserPaginated method with the user ID and pagination parameters
      const { tasks, totalTasks, taskCountsByState } = await TasksService.findTasksByUserPaginated(userId, page, limit);

      // Return the paginated tasks and pagination information
      successResponse(res, 'Get user tasks successful', {
        tasks, currentPage: page, totalPages: Math.ceil(totalTasks / limit), totalTasks, taskCountsByState
      }, 200);
    } catch (error) {
      next(error);
    };
  };

  // Get all tasks by tags
  async getAllByTagsAndStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Parse pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      // Get userId from request
      const { id: userId } = (req as any).user;

      // Parse tags from query
      let tags = req.query.tags;
      if (!tags) {
        tags = [];
      };

      // Ensure tags is an array of numbers
      if (typeof tags === 'string') {
        tags = [tags];
      };

      const status = req.query.status as string || '';

      if (!Array.isArray(tags)) {
        tags = [];
      }
      const tagsNumber = tags.map(tag => +tag)

      // Call the service to find tasks by tags, status, and pagination
      const { tasks, totalTasks } = await TasksService.findTasksByTagsPaginated(tagsNumber, status, userId, page, limit);

      // Return paginated tasks
      successResponse(res, 'Get tasks by tags and status successful', {
        tasks, currentPage: page, totalPages: Math.ceil(totalTasks / limit), totalTasks
      }, 200);
    } catch (error) {
      next(error);
    };
  };

  // Get a task by id
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await TasksService.findById(Number(req.params.id));
      successResponse(res, 'Get task successful', task, 200);
    } catch (error) {
      next(error);
    };
  };

  // Create a new task
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = (req as any).user;
      const task = await TasksService.create({ ...req.body, userId });
      successResponse(res, 'Task created successfully', task, 201);
    } catch (error) {
      next(error);
    };
  };

  // Update a task
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await TasksService.update(Number(req.params.id), req.body);
      successResponse(res, 'Task updated successfully', task, 200);
    } catch (error) {
      next(error);
    };
  };

  // Delete a task
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await TasksService.delete(Number(req.params.id));
      successResponse(res, 'Task deleted successfully', null, 204);
    } catch (error) {
      next(error);
    };
  };
};

export default new TasksController();
