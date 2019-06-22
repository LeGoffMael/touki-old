import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReaction, defaultValue } from 'app/shared/model/reaction.model';

export const ACTION_TYPES = {
  FETCH_REACTION_LIST: 'reaction/FETCH_REACTION_LIST',
  FETCH_REACTION: 'reaction/FETCH_REACTION',
  CREATE_REACTION: 'reaction/CREATE_REACTION',
  UPDATE_REACTION: 'reaction/UPDATE_REACTION',
  DELETE_REACTION: 'reaction/DELETE_REACTION',
  RESET: 'reaction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReactionState = Readonly<typeof initialState>;

// Reducer

export default (state: ReactionState = initialState, action): ReactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REACTION):
    case REQUEST(ACTION_TYPES.UPDATE_REACTION):
    case REQUEST(ACTION_TYPES.DELETE_REACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REACTION):
    case FAILURE(ACTION_TYPES.CREATE_REACTION):
    case FAILURE(ACTION_TYPES.UPDATE_REACTION):
    case FAILURE(ACTION_TYPES.DELETE_REACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_REACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REACTION):
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

const apiUrl = 'api/reactions';

// Actions

export const getEntities: ICrudGetAllAction<IReaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REACTION_LIST,
  payload: axios.get<IReaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IReaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REACTION,
    payload: axios.get<IReaction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
