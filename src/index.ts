import mikroConfig from './mikro-orm.config';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  orm.getMigrator().up();

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  // const post = orm.em.create(Post, { title: 'my first post' });
  // await orm.em.persistAndFlush(post);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [HelloResolver, PostResolver],
    }),
    context: () => ({
      em: orm.em,
    }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log('Application started on localhost:4000');
  });
};

main();
