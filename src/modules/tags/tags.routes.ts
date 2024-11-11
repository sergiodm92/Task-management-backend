import { Router } from 'express';
import TagsController from './tags.controller';
import validateDTO from '@middleware/validation.middleware';
import { CreateTagDTO, UpdateTagDTO } from './dtos';

const router = Router();
//get all Tags
router.get('/all', TagsController.getAll);
//get all Tags by user
router.get('/', TagsController.getAllByUser);
//get Tag by id
router.get('/:id', TagsController.getOne);
//create new Tag
router.post('/', validateDTO(CreateTagDTO), TagsController.create);
//update Tag
router.put('/:id', validateDTO(UpdateTagDTO), TagsController.update);
//delete Tag
router.delete('/:id', TagsController.delete);

export default router;
