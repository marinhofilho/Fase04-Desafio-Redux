import { all } from 'redux-saga/effects';
// it is for sagas junction

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}
