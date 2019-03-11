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

export const ADD_ITEM_REQUEST = `${prefix}/ADD_ITEM_REQUEST`;
export const ADD_ITEM_SUCCESS = `${prefix}/ADD_ITEM_SUCCESS`;
export const ADD_ITEM_ERROR = `${prefix}/ADD_ITEM_ERROR`;
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const GET_ALL_ITEMS_REQUEST = `${prefix}/GET_ITEMS`;
export const GET_ITEMS_SUCCESS = `${prefix}/GET_ITEMS_SUCCESS`;
export const GET_ITEMS_ERROR = `${prefix}/GET_ITEMS_ERROR`;
export const DELETE_ITEM_REQUEST = `${prefix}/DELETE_ITEM_REQUEST`;
export const DELETE_ITEM_SUCCESS = `${prefix}/DELETE_ITEM_SUCCESS`;
export const DELETE_ITEM_ERROR = `${prefix}/DELETE_ITEM_ERROR`;

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
    case GET_ALL_ITEMS_REQUEST:
    case DELETE_ITEM_REQUEST:
    case ADD_ITEM_REQUEST:
      return state.set('loading', true);

    case GET_ITEMS_SUCCESS:
      return state
        .set('shoppingList', new List(payload.data))
        .set('loading', false)
        .set('error', null);

    case GET_ITEMS_ERROR:
    case DELETE_ITEM_ERROR:
    case ADD_ITEM_ERROR:
      return state.set('error', payload.err).set('loading', false);

    case ADD_ITEM_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .update('shoppingList', (shoppingList) => shoppingList.concat(payload));

    case DELETE_ITEM_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .update('shoppingList', (shoppingList) =>
          shoppingList.filter((item) => item._id !== payload)
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
export const shoppingListSelector = createSelector(
  stateSelector,
  (state) => state.shoppingList
);
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

/**
 * Action Creators
 * */
export const addItem = (name) => {
  return {
    type: ADD_ITEM_REQUEST,
    payload: { name }
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM_REQUEST,
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
      type: GET_ALL_ITEMS_REQUEST
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

export function* deleteItemSaga(action) {
  const { payload } = action;

  try {
    yield call(API.deleteItem, payload.id);
    yield put({
      type: DELETE_ITEM_SUCCESS,
      payload: payload.id
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: DELETE_ITEM_ERROR,
      payload: { err }
    });
  }
}

export function* addItemSaga(action) {
  const { payload } = action;

  try {
    const { data } = yield call(API.addItem, payload.name);
    yield put({
      type: ADD_ITEM_SUCCESS,
      payload: data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_ITEM_ERROR,
      payload: { err }
    });
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, getItemsSaga),
    takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga),
    takeEvery(ADD_ITEM_REQUEST, addItemSaga)
  ]);
}
