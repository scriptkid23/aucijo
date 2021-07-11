import { handleActions, createActions } from "redux-actions";

export const actions = createActions({
  FETCH_AUCTION_LIST: [(meta) => meta, (payload) => payload],
  UPDATE_AUCTION:[meta => meta, payload => payload],
});

const defaultState = {
    auctions:[],
};
const reducers = handleActions(
  {
    [actions.fetchAuctionList]:(state, action) =>{
      return{
        ...state,
        auctions:action.payload,
      }
    },
    
  },
  defaultState
);
export default reducers;
