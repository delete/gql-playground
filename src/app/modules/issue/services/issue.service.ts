import { Injectable } from '@nestjs/common';
import { InstanceType } from 'typegoose';

import { Issue, IssueModel } from '../issue.entity';

@Injectable()
export class IssueService {
  async findAll(): Promise<InstanceType<Issue>[]> {
    return IssueModel.find({}).populate('assignee');
  }
}
