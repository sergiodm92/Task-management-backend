import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import taskRoutes from '../modules/tasks/tasks.routes';
import tagRoutes from '../modules/tags/tags.routes';
import authMiddleware from '@middleware/auth.middleware';
import createError from 'http-errors';

const router = Router();

// Main route
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Wellcome to the Back-Challange API!' });
});

// Routes by modules
router.use('/auth', authRoutes);
router.use('/tasks', authMiddleware, taskRoutes);
router.use('/tags', authMiddleware, tagRoutes);

// Middleware by default
router.use(() => {
    throw new createError.NotFound('Route not found');
});

export default router;
