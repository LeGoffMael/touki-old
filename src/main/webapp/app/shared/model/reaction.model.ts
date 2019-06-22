import { IUserExtra } from 'app/shared/model/user-extra.model';
import { ITravel } from 'app/shared/model/travel.model';
import { IPhoto } from 'app/shared/model/photo.model';
import { IComment } from 'app/shared/model/comment.model';

export const enum ReactionType {
  LIKE = 'LIKE',
  REPORT = 'REPORT'
}

export interface IReaction {
  id?: number;
  type?: ReactionType;
  owner?: IUserExtra;
  travel?: ITravel;
  photo?: IPhoto;
  comment?: IComment;
}

export const defaultValue: Readonly<IReaction> = {};
