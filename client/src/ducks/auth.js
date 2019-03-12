import { appName } from '../config';
import { Record, Map } from 'immutable';
import { createSelector } from 'reselect';
import { takeEvery, call, put, all, take } from 'redux-saga/effects';
import api from '../services/api';

/**
 * Constants
 * */
export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_IN_LIMIT_REACHED = `${prefix}/SIGN_IN_LIMIT_REACHED`;
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const AUTH_STATE_CHANGE = `${prefix}/AUTH_STATE_CHANGE`;
export const SET_NAME = `${prefix}/SET_NAME`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const LOAD_USER_REQUEST = `${prefix}/LOAD_USER_REQUEST`;
export const LOAD_USER_SUCCESS = `${prefix}/LOAD_USER_SUCCESS`;
export const LOAD_USER_ERROR = `${prefix}/LOAD_USER_ERROR`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: new Map({}),
  error: null,
  isAuthenticated: null,
  isLoading: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('isLoading', true);

    case SIGN_UP_SUCCESS:
      return state
        .merge({ user: new Map(payload.user) })
        .set('isLoading', false)
        .set('isAuthenticated', true)
        .set('error', null);

    case SIGN_IN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return (
        state
          // .set('user', payload.data)
          .merge({ user: new Map(payload.user) })
          .set('error', null)
          .set('isLoading', false)
          .set('isAuthenticated', true)
      );

    case SIGN_OUT_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', false)
        .set('user', null);

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
    case LOAD_USER_ERROR:
      return state.set('error', payload.error).set('isLoading', false);

    case SET_NAME:
      return state.set('user', payload.name);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName];
export const userSelector = (state) => state[moduleName].user;
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
);
export const authError = createSelector(
  stateSelector,
  (state) => state.error
);

export const isAuthSelector = createSelector(
  stateSelector,
  (state) => state.isAuthenticated
);

/**
 * Action Creators
 * */

export function setName(name) {
  return {
    type: SET_NAME,
    payload: { name }
  };
}

export const register = ({ name, email, password }) => {
  return {
    type: SIGN_UP_REQUEST,
    payload: { name, email, password }
  };
};

export const login = ({ email, password }) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: SIGN_OUT_SUCCESS
  };
};

export const loadUser = () => {
  return {
    type: LOAD_USER_REQUEST
  };
};
/**
 * Sagas
 */

export function* registerSaga(action) {
  const {
    payload: { name, email, password }
  } = action;
  try {
    const {
      data: { token, user }
    } = yield call(api.registerUser, {
      name,
      email,
      password
    });

    localStorage.setItem('token', token);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    });
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    yield put({
      type: SIGN_UP_ERROR,
      payload: { error }
    });
  }
}

export function* loginSaga(action) {
  const {
    payload: { email, password }
  } = action;
  try {
    const {
      data: { token, user }
    } = yield call(api.loginUser, { email, password });
    localStorage.setItem('token', token);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    });
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    yield put({
      type: SIGN_IN_ERROR,
      payload: { error }
    });
  }
}

export function* loadUserSaga() {
  try {
    const { data } = yield call(api.loadUser);
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: { data }
    });
  } catch (error) {
    console.log(error);
    localStorage.removeItem('token');
    yield put({
      type: LOAD_USER_ERROR,
      payload: { error }
    });
  }
}

export function* saga() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, registerSaga),
    takeEvery(LOAD_USER_REQUEST, loadUserSaga),
    takeEvery(SIGN_IN_REQUEST, loginSaga)
  ]);
}
