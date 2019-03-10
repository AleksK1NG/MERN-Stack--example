import { appName } from '../config';
import { Record, List } from 'immutable';
import { createSelector } from 'reselect';
import { takeEvery, call, put, all, take } from 'redux-saga/effects';
import items from '../mocks/shoppingList';
import uuid from 'uuid';
import API from '../services/api';

/**
 * Constants
 * */
export const moduleName = 'items';
const prefix = `${appName}/${moduleName}`;

export const ADD_ITEM = `${prefix}/ADD_ITEM`;
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const GET_ITEMS_START = `${prefix}/GET_ITEMS`;
export const GET_ITEMS_SUCCESS = `${prefix}/GET_ITEMS_SUCCESS`;
export const GET_ITEMS_ERROR = `${prefix}/GET_ITEMS_ERROR`;
export const DELETE_ITEM = `${prefix}/DELETE_ITEM`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: 'Alex',
  error: null,
  loading: false,
  items: new List(items),
  shoppingList: new List([])
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS_START:
      return state.set('loading', true);

    case GET_ITEMS_SUCCESS:
      return state
        .set('shoppingList', new List(payload.data))
        .set('loading', false)
        .set('error', null);

    case GET_ITEMS_ERROR:
      return state.set('error', payload.err).set('loading', false);

    case ADD_ITEM:
      return state
        .update('items', (items) =>
          items.push({ id: uuid(), name: payload.name })
        )
        .set('loading', false)
        .set('error', null);

    case DELETE_ITEM:
      return state.update('items', (items) =>
        items.filter((item) => item.id !== payload.id)
      );

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName];
export const userSelector = (state) => state[moduleName].user;
export const itemsSelector = createSelector(
  stateSelector,
  (state) => state.items
);
export const shoppingListSelector = createSelector(
  stateSelector,
  (state) => state.shoppingList
);

/**
 * Action Creators
 * */
export const addItem = (name) => {
  return {
    type: ADD_ITEM,
    payload: { name }
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: { id }
  };
};

export const getAllItems = () => {
  return {
    type: FETCH_ALL_REQUEST
  };
};
// export function signIn(email, password) {
//   return {
//     type: SIGN_IN_REQUEST,
//     payload: { email, password }
//   };
// }
//
// export function signUp(email, password) {
//   return {
//     type: SIGN_UP_REQUEST,
//     payload: { email, password }
//   };
// }
//
// export function setName(name) {
//   return {
//     type: SET_NAME,
//     payload: { name }
//   };
// }
/**
 * Sagas
 */

export function* getItemsSaga(action) {
  try {
    yield put({
      type: GET_ITEMS_START
    });

    const { data } = yield call(API.getItems);
    console.log('(from get items saga) => ', data);
    yield put({
      type: GET_ITEMS_SUCCESS,
      payload: { data }
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: GET_ITEMS_ERROR,
      payload: { err }
    });
  }
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, getItemsSaga)]);
}
