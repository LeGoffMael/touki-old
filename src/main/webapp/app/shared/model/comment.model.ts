import { Moment } from 'moment';
import { ITravel } from 'app/shared/model/travel.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IReaction } from 'app/shared/model/reaction.model';

export interface IComment {
  id?: number;
  text?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  travel?: ITravel;
  owner?: IUserExtra;
  reactions?: IReaction[];
}

export const defaultValue: Readonly<IComment> = {};
