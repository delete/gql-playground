import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import * as bodyParser from 'body-parser';
import { UserModule, IssueModule } from './modules';

@Module({
  imports: [
    GraphQLModule,
    UserModule,
    IssueModule,
  ],
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
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
        .forRoutes('/graphiql')
      // @ts-ignore
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/');

  }
}
