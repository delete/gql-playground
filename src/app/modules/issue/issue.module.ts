import { Module } from '@nestjs/common';
import { IssueService } from './services/issue.service';
import { IssueResolvers } from './issue.resolvers';

@Module({
  imports: [],
  controllers: [],
  providers: [IssueService, IssueResolvers],
})
export class IssueModule { }
