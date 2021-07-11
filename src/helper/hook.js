import { useDispatch } from "react-redux";
import * as MemberReducer from '../core/reducers/member.reducer';


export default function CustomHook(){
    const dispatch = useDispatch();
    const memberActions = {...MemberReducer.actions};

    const fetchMemberDetail = (data) => {
        dispatch(memberActions.fetchMemberDetail(data))
    }

    return{
        fetchMemberDetail,
    }


}