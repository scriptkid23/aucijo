import { handleActions, createActions } from "redux-actions";

export const actions = createActions({
  FETCH_MEMBER_DETAIL: [(meta) => meta, (payload) => payload],
});

const defaultState = {
  id: 0,
  token: 0,
  firsname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  address: "",
  items: [],
};
const reducers = handleActions(
  {
    [actions.fetchMemberDetail]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  defaultState
);
export default reducers;
