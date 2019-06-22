import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IAnswerUser } from 'app/shared/model/answer-user.model';
import { IBadge } from 'app/shared/model/badge.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { IComment } from 'app/shared/model/comment.model';
import { IReaction } from 'app/shared/model/reaction.model';
import { ITravel } from 'app/shared/model/travel.model';

export interface IUserExtra {
  id?: number;
  birthDate?: Moment;
  description?: string;
  user?: IUser;
  answers?: IAnswerUser[];
  badges?: IBadge[];
  followings?: IUserExtra[];
  comments?: IComment[];
  reactions?: IReaction[];
  travels?: ITravel[];
  followers?: IUserExtra[];
}

export const defaultValue: Readonly<IUserExtra> = {};
