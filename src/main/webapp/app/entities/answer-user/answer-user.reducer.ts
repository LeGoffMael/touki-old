import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnswerUser, defaultValue } from 'app/shared/model/answer-user.model';

export const ACTION_TYPES = {
  FETCH_ANSWERUSER_LIST: 'answerUser/FETCH_ANSWERUSER_LIST',
  FETCH_ANSWERUSER: 'answerUser/FETCH_ANSWERUSER',
  CREATE_ANSWERUSER: 'answerUser/CREATE_ANSWERUSER',
  UPDATE_ANSWERUSER: 'answerUser/UPDATE_ANSWERUSER',
  DELETE_ANSWERUSER: 'answerUser/DELETE_ANSWERUSER',
  RESET: 'answerUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnswerUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AnswerUserState = Readonly<typeof initialState>;

// Reducer

export default (state: AnswerUserState = initialState, action): AnswerUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ANSWERUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANSWERUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANSWERUSER):
    case REQUEST(ACTION_TYPES.UPDATE_ANSWERUSER):
    case REQUEST(ACTION_TYPES.DELETE_ANSWERUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ANSWERUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANSWERUSER):
    case FAILURE(ACTION_TYPES.CREATE_ANSWERUSER):
    case FAILURE(ACTION_TYPES.UPDATE_ANSWERUSER):
    case FAILURE(ACTION_TYPES.DELETE_ANSWERUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANSWERUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANSWERUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANSWERUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_ANSWERUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANSWERUSER):
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

const apiUrl = 'api/answer-users';

// Actions

export const getEntities: ICrudGetAllAction<IAnswerUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ANSWERUSER_LIST,
  payload: axios.get<IAnswerUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAnswerUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANSWERUSER,
    payload: axios.get<IAnswerUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnswerUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANSWERUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnswerUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANSWERUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnswerUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANSWERUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
