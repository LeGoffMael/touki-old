import { Moment } from 'moment';
import { ITravel } from 'app/shared/model/travel.model';
import { ICity } from 'app/shared/model/city.model';
import { IPlace } from 'app/shared/model/place.model';
import { IPhoto } from 'app/shared/model/photo.model';

export interface IStep {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  createdAt?: Moment;
  updatedAt?: Moment;
  travel?: ITravel;
  city?: ICity;
  places?: IPlace[];
  photos?: IPhoto[];
}

export const defaultValue: Readonly<IStep> = {};
