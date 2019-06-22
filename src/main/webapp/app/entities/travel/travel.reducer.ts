import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITravel, defaultValue } from 'app/shared/model/travel.model';

export const ACTION_TYPES = {
  FETCH_TRAVEL_LIST: 'travel/FETCH_TRAVEL_LIST',
  FETCH_TRAVEL: 'travel/FETCH_TRAVEL',
  CREATE_TRAVEL: 'travel/CREATE_TRAVEL',
  UPDATE_TRAVEL: 'travel/UPDATE_TRAVEL',
  DELETE_TRAVEL: 'travel/DELETE_TRAVEL',
  RESET: 'travel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITravel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TravelState = Readonly<typeof initialState>;

// Reducer

export default (state: TravelState = initialState, action): TravelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAVEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAVEL):
    case REQUEST(ACTION_TYPES.UPDATE_TRAVEL):
    case REQUEST(ACTION_TYPES.DELETE_TRAVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAVEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAVEL):
    case FAILURE(ACTION_TYPES.CREATE_TRAVEL):
    case FAILURE(ACTION_TYPES.UPDATE_TRAVEL):
    case FAILURE(ACTION_TYPES.DELETE_TRAVEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAVEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAVEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAVEL):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAVEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAVEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/travels';

// Actions

export const getEntities: ICrudGetAllAction<ITravel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRAVEL_LIST,
  payload: axios.get<ITravel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITravel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAVEL,
    payload: axios.get<ITravel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITravel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAVEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITravel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAVEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITravel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAVEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
