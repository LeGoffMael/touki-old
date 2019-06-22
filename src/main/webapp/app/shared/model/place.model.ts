import { ICity } from 'app/shared/model/city.model';
import { IStep } from 'app/shared/model/step.model';

export interface IPlace {
  id?: number;
  name?: string;
  city?: ICity;
  steps?: IStep[];
}

export const defaultValue: Readonly<IPlace> = {};
