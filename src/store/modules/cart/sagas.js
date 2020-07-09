// can't do no api.get
// call calls async methods that return promises
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-tiny-toast';
import api from '../../../services/api';

import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// yield substitutes await
//* replaces async
function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Toast.show('Estoque esgotado', {
      position: Toast.position.BOTTOM,
      containerStyle: {
        borderRadius: 100,
        backgroundColor: '#CD853F',
      },
      textStyle: {
        fontWeight: 'bold',
      },
    });
    return;
  }
  // check if css of react-native-tiny-toast is correct

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    // put shoots action in saga
    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Toast.show('Estoque esgotado', {
      position: Toast.position.BOTTOM,
      containerStyle: {
        borderRadius: 100,
        backgroundColor: '#CD853F',
      },
      textStyle: {
        fontWeight: 'bold',
      },
    });
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

// é um cadastro de listeners
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
// o primeiro parâmetro é qual ação quer ouvir
// o segundo é qual função quer disparar
