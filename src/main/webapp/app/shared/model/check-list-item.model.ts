import { ITravel } from 'app/shared/model/travel.model';

export interface ICheckListItem {
  id?: number;
  name?: string;
  isDone?: boolean;
  travel?: ITravel;
}

export const defaultValue: Readonly<ICheckListItem> = {
  isDone: false
};
