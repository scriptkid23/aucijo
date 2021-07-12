import { handleActions, createActions } from "redux-actions";

export const actions = createActions({
  FETCH_AUCTION_LIST: [(meta) => meta, (payload) => payload],
  UPDATE_AUCTION:[meta => meta, payload => payload],
  FETCH_AUCTION_DETAIL:[meta => meta, payload => payload],
  UPDATE_AUCTION_DETAIL:[meta => meta, payload => payload],
});

const defaultState = {
    auctions:[],
    auctionDetail:{
      owner:"",
      currentKing: "",
    },
};
const reducers = handleActions(
  {
    [actions.fetchAuctionList]:(state, action) =>{
      return{
        ...state,
        auctions:action.payload,
      }
    },
    [actions.updateAuction]:(state, action) => {
        return{
            ...state,
            auctions:[...state.auctions, action.payload],
        }
    },
    [actions.fetchAuctionDetail]:(state, action) => {
      return{
          ...state,
          auctionDetail: action.payload,
      }
  },
    [actions.updateAuctionDetail]:(state, action) => {
      return{
        ...state,
        auctionDetail:{
          ...state.auctionDetail,
          currentKing: action.payload.currentKing,
          price: action.payload.price,
        }
      }
    },  
    
  },
  defaultState
);
export default reducers;
