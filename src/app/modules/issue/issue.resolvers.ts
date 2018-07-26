import { Query, Resolver } from '@nestjs/graphql';
import { IssueService } from './services/issue.service';

@Resolver('Issue')
export class IssueResolvers {
  constructor(private readonly issueService: IssueService) { }

  @Query()
  async issues(): Promise<any> {
    return this.issueService.findAll();
  }
}