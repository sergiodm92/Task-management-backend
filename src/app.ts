import 'reflect-metadata';
import express, { Application } from 'express';
import { AppDataSource } from '@config/database';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import errorHandler from '@middleware/errors.middleware';

const app: Application = express();

// Security configuration

app.use(helmet());
// CORS configuration
app.use(cors());
// Limit requests to 100 per IP in 15 minutes.
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
// Globals middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Connection to the database
AppDataSource.initialize()
  .then(() => console.log('Connected to the database with TypeORM'))
  .catch(error => console.error('Error connecting to the database:', error));

export default app;
