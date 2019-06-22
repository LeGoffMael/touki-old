import { Moment } from 'moment';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IAnswer } from 'app/shared/model/answer.model';

export interface IAnswerUser {
  id?: number;
  completeDate?: Moment;
  user?: IUserExtra;
  answer?: IAnswer;
}

export const defaultValue: Readonly<IAnswerUser> = {};
