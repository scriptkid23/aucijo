import { handleActions, createActions } from "redux-actions";
import { convertArrayFromSolidity } from "../../helper/utils";

export const actions = createActions({
  FETCH_MEMBER_DETAIL: [(meta) => meta, (payload) => payload],
  UPDATE_TOKEN: [(meta) => meta, (payload) => payload],
  UPDATE_ITEM: [(meta) => meta, (payload) => payload],
});

const defaultState = {
  id: 0,
  tokens: 0,
  balance: 0,
  firsname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  _address: "",
  items: [],
  historyTransaction: [],
};
const reducers = handleActions(
  {
    [actions.updateItem]: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    [actions.fetchMemberDetail]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
        balance: action.payload.balance,
        historyTransaction: convertArrayFromSolidity(
          action.payload.data.historyTransaction
        ),
      };
    },
    [actions.updateToken]: (state, action) => {
      return {
        ...state,
        balance: action.payload,
      };
    },
  },
  defaultState
);
export default reducers;
