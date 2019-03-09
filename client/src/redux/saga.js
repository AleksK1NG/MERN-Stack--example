import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../ducks/auth';
import { saga as itemsSaga } from '../ducks/items';

export default function* rootSaga() {
  yield all([authSaga(), itemsSaga()]);
}
