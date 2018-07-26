import { prop, Typegoose, staticMethod, ModelType } from 'typegoose';

export enum Team {
  GREEN = 'green',
  RED = 'red',
  BLUE = 'blue',
}

export class User extends Typegoose {

  @prop({ required: true, unique: true })
  username: string;

  @prop({ enum: Team, required: true })
  team: Team;

  @prop({ required: true })
  role: string[];
}

export const UserModel = new User().getModelForClass(User);