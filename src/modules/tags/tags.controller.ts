import { Request, Response, NextFunction } from 'express';
import TagsService from './tags.service';
import { successResponse } from '@utils/responseTemplates';

class TagsController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await TagsService.findAll();
      res.status(200).json(successResponse('Get all tags successfully', tags, 200));
    } catch (error) {
      next(error); 
    }
  }

  async getAllByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = (req as any).user;
      const tags = await TagsService.findByUserId(userId);
      res.status(200).json(successResponse('Get all tags by user successfully', tags, 200));
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await TagsService.findById(Number(req.params.id));
      if (!tag) {
        res.status(404).json({ success: false, message: 'Tag not found' });
        return;
      }
      res.status(200).json(successResponse('Get tag successfully', tag, 200));
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = (req as any).user;
      const tag = await TagsService.create({ ...req.body, userId });
      res.status(201).json(successResponse('Tag created successfully', tag, 201));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tag = await TagsService.update(+req.params.id, req.body);
      res.status(200).json(successResponse('Update tag successfully', tag, 200));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = (req as any).user;
      await TagsService.delete(+req.params.id, userId);
      res.status(204).json(successResponse('Tag deleted successfully', null, 204));
    } catch (error) {
      next(error);
    }
  }
}

export default new TagsController();
