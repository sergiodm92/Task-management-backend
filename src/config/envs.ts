import 'dotenv/config';

export default {
  JWT_SECRET: process.env.JWT_SECRET || 'Supersecret.123',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  PORT: process.env.PORT || 3000,
  DATABASE_NAME: process.env.DATABASE_NAME || 'database.sqlite',
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'sqlite',
};