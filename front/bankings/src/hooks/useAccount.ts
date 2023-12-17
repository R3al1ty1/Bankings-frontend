import {useDispatch, useSelector} from 'react-redux';
import {updateAccount} from "../store/selectedAccountSlice";
import {Account} from "Types";

export function useAccount() {
    const account = useSelector((state: { selectedAccount: { account: Account } }) => state.selectedAccount.account);

    const dispatch = useDispatch();

    const setAccount= (value: any) => {
        dispatch(updateAccount(value))
    }

    return {
        account,
        setAccount
    };
}