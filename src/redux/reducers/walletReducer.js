import {
  FETCH_CURRENCIES,
  ADD_NEW_EXPENSE,
  DELETE_EXPENSE,
  SAVE_IDTOEDIT,
  OVERWRITE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isEditing: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: action.payload.id,
        }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case SAVE_IDTOEDIT:
    return {
      ...state,
      idToEdit: action.payload,
      isEditing: true,
    };
  case OVERWRITE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.map((each) => {
        if (each.id === action.payload.id) {
          return {
            ...each,
            description: action.payload.description,
            tag: action.payload.tag,
            method: action.payload.method,
            value: action.payload.value,
            currency: action.payload.currency,
            id: action.payload.id,
          };
        }
        return each;
      }),
    };
  default:
    return state;
  }
};

export default walletReducer;
