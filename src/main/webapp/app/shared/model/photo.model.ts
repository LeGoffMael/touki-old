import { Moment } from 'moment';
import { IStep } from 'app/shared/model/step.model';
import { IReaction } from 'app/shared/model/reaction.model';

export interface IPhoto {
  id?: number;
  link?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  steps?: IStep[];
  reactions?: IReaction[];
}

export const defaultValue: Readonly<IPhoto> = {};
