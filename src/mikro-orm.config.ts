import { Post } from './entities/Post';
import { Options } from '@mikro-orm/core';
import { User } from './entities/User';

export default {
  migrations: {
    path: './src/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: 'lireddit',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
} as Options;
