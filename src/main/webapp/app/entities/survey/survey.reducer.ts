import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISurvey, defaultValue } from 'app/shared/model/survey.model';

export const ACTION_TYPES = {
  FETCH_SURVEY_LIST: 'survey/FETCH_SURVEY_LIST',
  FETCH_SURVEY: 'survey/FETCH_SURVEY',
  CREATE_SURVEY: 'survey/CREATE_SURVEY',
  UPDATE_SURVEY: 'survey/UPDATE_SURVEY',
  DELETE_SURVEY: 'survey/DELETE_SURVEY',
  RESET: 'survey/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISurvey>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SurveyState = Readonly<typeof initialState>;

// Reducer

export default (state: SurveyState = initialState, action): SurveyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SURVEY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SURVEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SURVEY):
    case REQUEST(ACTION_TYPES.UPDATE_SURVEY):
    case REQUEST(ACTION_TYPES.DELETE_SURVEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SURVEY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SURVEY):
    case FAILURE(ACTION_TYPES.CREATE_SURVEY):
    case FAILURE(ACTION_TYPES.UPDATE_SURVEY):
    case FAILURE(ACTION_TYPES.DELETE_SURVEY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SURVEY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SURVEY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SURVEY):
    case SUCCESS(ACTION_TYPES.UPDATE_SURVEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SURVEY):
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

const apiUrl = 'api/surveys';

// Actions

export const getEntities: ICrudGetAllAction<ISurvey> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SURVEY_LIST,
  payload: axios.get<ISurvey>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISurvey> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SURVEY,
    payload: axios.get<ISurvey>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISurvey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SURVEY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISurvey> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SURVEY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISurvey> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SURVEY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
