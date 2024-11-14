import { Router } from 'express';
import TasksController from './tasks.controller';
import validateDTO from '@middleware/validation.middleware';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos';

const router = Router();

//get all Tasks
router.get('/all', TasksController.getAll);
//get all Tasks
router.get('/', TasksController.getUserTasks);
//get all Tasks by tags
router.get('/tags', TasksController.getAllByTagsAndStatus);
//get Task by id
router.get('/:id', TasksController.getOne);
//create Task
router.post('/', validateDTO(CreateTaskDTO), TasksController.create);
//update Task
router.put('/:id', validateDTO(UpdateTaskDTO), TasksController.update);
//delete Task
router.delete('/:id', TasksController.delete);

export default router;
