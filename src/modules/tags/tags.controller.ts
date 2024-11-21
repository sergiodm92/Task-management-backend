import { Request, Response } from 'express';
import TagsService from './tags.service';
import { errorResponse, successResponse } from '@utils/responseTemplates';
import { TagHasAssociatedTasksError } from '@utils/TagHasAssociatedTaskError';

class TagsController {
    // Get all tags
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const tags = await TagsService.findAll();
            res.status(200).json(successResponse('Get all tags successfully', tags, 200));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json(errorResponse(errorMessage, null, 500));
        }
    }
    // Get all tags by user
    async getAllByUser(req: Request, res: Response): Promise<void> {
        try {
          const { id: userId } = (req as any).user; 
    
          const tags = await TagsService.findByUserId(userId);
    
          if (tags.length === 0) {
            res.status(404).json(errorResponse('No tags found for this user', null, 404));
            return;
          }
    
          res.status(200).json(successResponse('Get all tags by user successfully', tags, 200));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          res.status(500).json(errorResponse(errorMessage, null, 500));
        }
      }
    // Get a tag by id
    async getOne(req: Request, res: Response): Promise<void> {
        try {
            const tag = await TagsService.findById(Number(req.params.id));

            if (!tag) {
                res.status(404).json(errorResponse('Tag not found', null, 404));
                return;
            }

            res.status(200).json(successResponse('Get tag successfully', tag, 200));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json(errorResponse(errorMessage, null, 500));
        }
    }
    // Create a new tag
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = (req as any).user;
            const tag = await TagsService.create({ ...req.body, userId });
            res.status(201).json(successResponse('Tag created successfully', tag, 201));
        } catch (error) {
            let errorMessage = 'Unknown error';
            let statusCode = 400;

            if (error instanceof Error) {
                errorMessage = error.message;
                statusCode = error.message === 'Tag already exists' ? 409 : 400;
            }

            res.status(statusCode).json(errorResponse(errorMessage, null, statusCode));
        }
    }
    // Update a tag
    async update(req: Request, res: Response): Promise<void> {
        try {
            const tag = await TagsService.update(+req.params.id, req.body);
            res.status(200).json(successResponse('Update tag successfully', tag, 200));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json(errorResponse(errorMessage, null, 400));
        }
    }
    // Delete a tag
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = (req as any).user;
            await TagsService.delete(+req.params.id, userId);
            res.status(204).json(successResponse('Tag deleted successfully', null, 204));
        } catch (error) {
            if (error instanceof TagHasAssociatedTasksError) {
                res.status(405).json(errorResponse(error.message, null, 405));
            } else {
                console.error(error);
                res.status(500).json(errorResponse('An unexpected error occurred', null, 500));
            }
        }
    }
}

export default new TagsController();
