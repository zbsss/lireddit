import { Post } from './entities/Post';
import { Options } from '@mikro-orm/core';

export default {
  migrations: {
    path: './src/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  dbName: 'lireddit',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
} as Options;
