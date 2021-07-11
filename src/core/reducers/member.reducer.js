import { handleActions, createActions } from "redux-actions";

export const actions = createActions({
  FETCH_MEMBER_DETAIL: [(meta) => meta, (payload) => payload],
  UPDATE_TOKEN:[meta => meta, payload => payload],
  UPDATE_ITEM:[meta => meta, payload => payload],
});

const defaultState = {
  id: 0,
  tokens: 0,
  firsname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  _address: "",
  items: [],
};
const reducers = handleActions(
  {
    [actions.updateItem]:(state, action) =>{
      return{
        ...state,
        items:[...state.items, action.payload],
      }
    },
    [actions.fetchMemberDetail]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [actions.updateToken]:(state, action) => {
      return{
        ...state,
        tokens: action.payload,
      }
    },
  },
  defaultState
);
export default reducers;
