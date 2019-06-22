import { IUserExtra } from 'app/shared/model/user-extra.model';

export interface IBadge {
  id?: number;
  label?: string;
  icon?: string;
  text?: string;
  users?: IUserExtra[];
}

export const defaultValue: Readonly<IBadge> = {};
