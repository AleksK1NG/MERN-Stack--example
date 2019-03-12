import { appName } from '../config';
import { Record } from 'immutable';
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

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: 'Alex',
  error: null,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('isLoading', true);

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case AUTH_STATE_CHANGE:
      return state
        .set('user', payload.user)
        .set('error', null)
        .set('isLoading', false)
        .set('isAuthenticated', true);

    case SIGN_OUT_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isAuthenticated', false)
        .set('user', null)
        .set('token', null);

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return state.set('error', error).set('isLoading', false);

    case SIGN_IN_LIMIT_REACHED:
      return state.set('limitReached', true);

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

/**
 * Action Creators
 * */
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

export const logout = () => {
  return {
    type: SIGN_OUT_SUCCESS
  };
};

/**
 * Sagas
 */

// export function* signInSaga() {
//   for (let i = 0; i < 3; i++) {
//     const {
//       payload: { email, password }
//     } = yield take(SIGN_IN_REQUEST);
//     try {
//       const user = yield call(api.signIn, email, password);
//
//       yield put({
//         type: SIGN_IN_SUCCESS,
//         payload: { user }
//       });
//     } catch (error) {
//       yield put({
//         type: SIGN_IN_ERROR,
//         error
//       });
//     }
//   }
//
//   yield put({
//     type: SIGN_IN_LIMIT_REACHED
//   });
// }
//
// export function* signUpSaga({ payload: { email, password } }) {
//   try {
//     const user = yield call(api.signUp, email, password);
//
//     yield put({
//       type: SIGN_UP_SUCCESS,
//       payload: { user }
//     });
//   } catch (error) {
//     yield put({
//       type: SIGN_UP_ERROR,
//       error
//     });
//   }
// }

export function* registerSaga(action) {
  const {
    payload: { name, email, password }
  } = action;
  try {
    const { token, user } = yield call(api.registerUser, {
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
    yield put({
      type: SIGN_UP_ERROR,
      payload: error
    });
  }
}

export function* saga() {
  yield all([takeEvery(SIGN_UP_REQUEST, registerSaga)]);
}
