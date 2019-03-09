import { appName } from '../config';
import { Record, List } from 'immutable';
import { createSelector } from 'reselect';
import { takeEvery, call, put, all, take } from 'redux-saga/effects';
import items from '../mocks/shoppingList';
import uuid from 'uuid';

/**
 * Constants
 * */
export const moduleName = 'items';
const prefix = `${appName}/${moduleName}`;

export const ADD_ITEM = `${prefix}/ADD_ITEM`;
export const GET_ITEMS = `${prefix}/GET_ITEMS`;
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
  items: new List(items)
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case GET_ITEMS:
      return state.set('items', new List(payload));

    case ADD_ITEM:
      return state.update('items', (items) =>
        items.push({ id: uuid(), name: payload.name })
      );

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

export function* saga() {
  yield all([]);
}
