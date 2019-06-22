import { ITravel } from 'app/shared/model/travel.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface ISurvey {
  id?: number;
  label?: string;
  travel?: ITravel;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<ISurvey> = {};
