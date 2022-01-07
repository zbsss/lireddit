// import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import { COOKIE_NAME } from './constants';
import { createConnection } from 'typeorm';
import { isDevelopment } from './utils/isDevelopment';
import { Post } from './entities/Post';
import { User } from './entities/User';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'lireddit2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: isDevelopment(),
    entities: [Post, User],
  });

  const app = express();
  app.set('trust proxy', isDevelopment());

  const corsOptions = {
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    credentials: true,
  };

  app.use(cors(corsOptions));

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      secret: 'super secret',
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 860000000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [PostResolver, UserResolver],
    }),
    context: ({ req, res }): MyContext => ({
      req: req,
      res: res,
      redis: redis,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('Application started on localhost:4000');
  });
};

main();
