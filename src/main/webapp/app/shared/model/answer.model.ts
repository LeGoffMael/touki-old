import { IAnswerUser } from 'app/shared/model/answer-user.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IAnswer {
  id?: number;
  text?: string;
  answerResults?: IAnswerUser[];
  question?: IQuestion;
}

export const defaultValue: Readonly<IAnswer> = {};
