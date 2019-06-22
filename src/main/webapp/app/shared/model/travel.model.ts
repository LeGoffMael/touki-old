import { Moment } from 'moment';
import { ISurvey } from 'app/shared/model/survey.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IStep } from 'app/shared/model/step.model';
import { ICheckListItem } from 'app/shared/model/check-list-item.model';
import { IComment } from 'app/shared/model/comment.model';
import { IReaction } from 'app/shared/model/reaction.model';

export const enum TravelStatus {
  PLANNED = 'PLANNED',
  CURRENT = 'CURRENT',
  DONE = 'DONE'
}

export interface ITravel {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  status?: TravelStatus;
  precaution?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  surveys?: ISurvey[];
  users?: IUserExtra[];
  steps?: IStep[];
  checkListItems?: ICheckListItem[];
  comments?: IComment[];
  reactions?: IReaction[];
}

export const defaultValue: Readonly<ITravel> = {};
