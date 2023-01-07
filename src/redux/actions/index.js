import getCurrentIssCurrencies from '../../components/services/issApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ACTION_SAVE_EMAIL = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ACTION_FETCH_CURRENCIES = async (dispatch) => {
  const payload = await getCurrentIssCurrencies();
  delete payload.USDT;
  dispatch({
    type: FETCH_CURRENCIES,
    payload,
  });
};

export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export const ACTION_ADD_NEW_EXPENSE = async (dispatch, payload) => {
  const exchangeRates = await getCurrentIssCurrencies();
  dispatch({
    type: ADD_NEW_EXPENSE,
    payload: {
      ...payload,
      exchangeRates,
      value: payload.value,
    },
  });
};

export const SAVE_IDTOEDIT = 'SAVE_IDTOEDIT';
export const ACTION_SAVE_IDTOEDIT = (dispatch, payload) => {
  dispatch({
    type: SAVE_IDTOEDIT,
    payload,
  });
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ACTION_DELETE_EXPENSE = (dispatch, payload) => {
  dispatch({
    type: DELETE_EXPENSE,
    payload,
  });
};

export const OVERWRITE_EXPENSES = 'OVERWRITE_EXPENSES';
export const ACTION_OVERWRITE_EXPENSES = (dispatch, payload) => {
  dispatch({
    type: OVERWRITE_EXPENSES,
    payload,
  });
};
