import { ISurvey } from 'app/shared/model/survey.model';
import { IAnswer } from 'app/shared/model/answer.model';

export interface IQuestion {
  id?: number;
  text?: string;
  survey?: ISurvey;
  answers?: IAnswer[];
}

export const defaultValue: Readonly<IQuestion> = {};
