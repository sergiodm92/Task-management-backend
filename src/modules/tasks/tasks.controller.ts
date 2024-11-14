import { Request, Response } from 'express';
import TasksService from './tasks.service';
import { successResponse, errorResponse } from '@utils/responseTemplates';

class TasksController {

  // Get all tasks
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TasksService.findAll();
      res.status(200).json(successResponse('Get all tasks successful', tasks, 200));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(errorMessage, null, 500));
    }
  }

  // Get all tasks by user
  async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = (req as any).user;

      // Get the page and limit parameters from the request query
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      // Call the findTasksByUserPaginated method with the user ID and pagination parameters
      const { tasks, totalTasks } = await TasksService.findTasksByUserPaginated(userId, page, limit);

      // Return the paginated tasks and pagination information
      res.status(200).json(successResponse('Get user tasks successful', {
        tasks,
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks
      }, 200));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(errorMessage, null, 500));
    }
  }

  // Get all tasks by tags
  async getAllByTagsAndStatus(req: Request, res: Response): Promise<void> {
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
        }

        // Ensure tags is an array of numbers
        if (typeof tags === 'string') {
            tags = [tags];
        }

        const status = req.query.status as string || '';
        
        if (!Array.isArray(tags)) {
          tags = [];
        }
        const tagsNumber = tags.map(tag => Number(tag)).filter(tag => !isNaN(tag));
        
            // Call the service to find tasks by tags, status, and pagination
        const { tasks, totalTasks } = await TasksService.findTasksByTagsPaginated(tagsNumber, status, userId, page, limit);

        // Return paginated tasks
        res.status(200).json(successResponse('Get tasks by tags and status successful', {
            tasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
        }, 200));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json(errorResponse(errorMessage, null, 500));
    }
}


  // Get a task by id
  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const task = await TasksService.findById(Number(req.params.id));
      if (!task) {
        res.status(404).json(errorResponse('Task not found', null, 404));
        return;
      }
      res.status(200).json(successResponse('Get task successful', task, 200));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(errorMessage, null, 500));
    }
  }

  // Create a new task
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { id: userId } = (req as any).user;

      const task = await TasksService.create({ ...req.body, userId });

      res.status(201).json(successResponse('Task created successfully', task, 201));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(errorMessage, null, 500));
    }
  }

  // Update a task
  async update(req: Request, res: Response): Promise<void> {
    try {
      const task = await TasksService.update(+req.params.id, req.body);
      res.status(200).json(successResponse('Update task successfully', task, 200));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json(errorResponse(errorMessage, null, 400));
    }
  }

  // Delete a task
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await TasksService.delete(+req.params.id);
      res.status(204).json(successResponse('Task deleted successfully', null, 204));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(errorMessage, null, 500));
    }
  }
}

export default new TasksController();
