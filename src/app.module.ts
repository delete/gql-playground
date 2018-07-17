import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksResolvers } from 'books.resolvers';
import { BooksService } from 'books.service';
import * as bodyParser from 'body-parser';

@Module({
  imports: [GraphQLModule],
  controllers: [AppController],
  providers: [AppService, BooksResolvers, BooksService],
})
export class AppModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}
  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(bodyParser.text({ type: 'application/graphql' }))
      .forRoutes('/')
      .apply((req, res, next) => {
        if (req.is('application/graphql')) {
          req.body = { query: req.body };
        }
        next();
      })
      .forRoutes('/')
      // @ts-ignore
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/');
  }
}
