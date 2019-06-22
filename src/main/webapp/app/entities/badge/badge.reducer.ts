import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBadge, defaultValue } from 'app/shared/model/badge.model';

export const ACTION_TYPES = {
  FETCH_BADGE_LIST: 'badge/FETCH_BADGE_LIST',
  FETCH_BADGE: 'badge/FETCH_BADGE',
  CREATE_BADGE: 'badge/CREATE_BADGE',
  UPDATE_BADGE: 'badge/UPDATE_BADGE',
  DELETE_BADGE: 'badge/DELETE_BADGE',
  RESET: 'badge/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBadge>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BadgeState = Readonly<typeof initialState>;

// Reducer

export default (state: BadgeState = initialState, action): BadgeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BADGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BADGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BADGE):
    case REQUEST(ACTION_TYPES.UPDATE_BADGE):
    case REQUEST(ACTION_TYPES.DELETE_BADGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BADGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BADGE):
    case FAILURE(ACTION_TYPES.CREATE_BADGE):
    case FAILURE(ACTION_TYPES.UPDATE_BADGE):
    case FAILURE(ACTION_TYPES.DELETE_BADGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BADGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BADGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BADGE):
    case SUCCESS(ACTION_TYPES.UPDATE_BADGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BADGE):
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

const apiUrl = 'api/badges';

// Actions

export const getEntities: ICrudGetAllAction<IBadge> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BADGE_LIST,
  payload: axios.get<IBadge>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBadge> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BADGE,
    payload: axios.get<IBadge>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBadge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BADGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBadge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BADGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBadge> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BADGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
