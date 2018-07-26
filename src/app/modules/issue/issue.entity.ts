import { Ref, prop, Typegoose, InstanceType } from 'typegoose';
import { User } from '../user/user.entity';

export interface Participant {
  assignee: InstanceType<User>;
}

export class Issue extends Typegoose {

  @prop({ required: true, unique: true })
  key!: string;

  @prop({ required: true })
  createdAt!: Date;

  @prop()
  startedAt?: Date | null;

  @prop()
  resolvedAt?: Date;

  @prop({ required: false })
  storyPoints!: number;

  @prop({ ref: User, required: true })
  assignee!: Ref<User>;

  @prop()
  totalWorklog!: number;

  @prop()
  participations: Participant[];
}

export const IssueModel = new Issue().getModelForClass(Issue);