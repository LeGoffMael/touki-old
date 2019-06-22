import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICheckListItem, defaultValue } from 'app/shared/model/check-list-item.model';

export const ACTION_TYPES = {
  FETCH_CHECKLISTITEM_LIST: 'checkListItem/FETCH_CHECKLISTITEM_LIST',
  FETCH_CHECKLISTITEM: 'checkListItem/FETCH_CHECKLISTITEM',
  CREATE_CHECKLISTITEM: 'checkListItem/CREATE_CHECKLISTITEM',
  UPDATE_CHECKLISTITEM: 'checkListItem/UPDATE_CHECKLISTITEM',
  DELETE_CHECKLISTITEM: 'checkListItem/DELETE_CHECKLISTITEM',
  RESET: 'checkListItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICheckListItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CheckListItemState = Readonly<typeof initialState>;

// Reducer

export default (state: CheckListItemState = initialState, action): CheckListItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHECKLISTITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHECKLISTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHECKLISTITEM):
    case REQUEST(ACTION_TYPES.UPDATE_CHECKLISTITEM):
    case REQUEST(ACTION_TYPES.DELETE_CHECKLISTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHECKLISTITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHECKLISTITEM):
    case FAILURE(ACTION_TYPES.CREATE_CHECKLISTITEM):
    case FAILURE(ACTION_TYPES.UPDATE_CHECKLISTITEM):
    case FAILURE(ACTION_TYPES.DELETE_CHECKLISTITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHECKLISTITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHECKLISTITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHECKLISTITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_CHECKLISTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHECKLISTITEM):
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

const apiUrl = 'api/check-list-items';

// Actions

export const getEntities: ICrudGetAllAction<ICheckListItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHECKLISTITEM_LIST,
  payload: axios.get<ICheckListItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICheckListItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHECKLISTITEM,
    payload: axios.get<ICheckListItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICheckListItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHECKLISTITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICheckListItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHECKLISTITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICheckListItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHECKLISTITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
