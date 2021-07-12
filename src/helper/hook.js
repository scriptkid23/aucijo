import { useDispatch } from "react-redux";
import * as MemberReducer from '../core/reducers/member.reducer';
import * as AuctionReducer from '../core/reducers/auction.reducer';

export default function CustomHook(){
    const dispatch = useDispatch();
    const memberActions = {...MemberReducer.actions};   
    const auctionActions = {...AuctionReducer.actions};
    const fetchMemberDetail = (data) => {
        dispatch(memberActions.fetchMemberDetail(data))
    }
    const fetchAuctionList = (data) => {
        dispatch(auctionActions.fetchAuctionList(data));
    }
    const updateToken = (data) => {
        dispatch(memberActions.updateToken(data));
    }
    const updateItem = (data) => {
        dispatch(memberActions.updateItem(data));
    }
    const updateAuction = (data) => {
        dispatch(auctionActions.updateAuction(data));
    }
    const fetchAuctionDetail = (data) => {
        dispatch(auctionActions.fetchAuctionDetail(data));
    }
    const updateAuctionDetail = (data) => {
        dispatch(auctionActions.updateAuctionDetail(data));
    }
    return{
        fetchMemberDetail,
        fetchAuctionList,
        updateToken,
        updateItem,
        updateAuction,
        fetchAuctionDetail,
        updateAuctionDetail,
    }


}