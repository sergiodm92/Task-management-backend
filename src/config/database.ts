import { DataSource } from 'typeorm';
import User from '@modules/auth/auth.entity';
import { Task } from '@modules/tasks/tasks.entity';
import envs from './envs';
import { Tag } from '@modules/tags/tags.entity';

type database_type = 'sqlite' | 'postgres' | 'mysql';

export const AppDataSource = new DataSource({
  type: envs.DATABASE_TYPE as database_type,
  database: envs.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Task, Tag],
});