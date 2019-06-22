import { ICountry } from 'app/shared/model/country.model';
import { IStep } from 'app/shared/model/step.model';
import { IPlace } from 'app/shared/model/place.model';

export interface ICity {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  country?: ICountry;
  steps?: IStep[];
  places?: IPlace[];
}

export const defaultValue: Readonly<ICity> = {};
