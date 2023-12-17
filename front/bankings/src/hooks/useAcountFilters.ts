import {useDispatch, useSelector} from 'react-redux';
import {updateAccounts, updateQuery} from "../store/accountFiltersSlice";
import {Account} from "Types";

export function useAccountFilters() {
    const accounts = useSelector((state: { accountFilters: { accounts: Account[], query: string } }) => state.accountFilters.accounts);
    const query = useSelector((state: { accountFilters: { accounts: Account[], query: string } }) => state.accountFilters.query);


    const dispatch = useDispatch()

    const setAccounts = (value: any) => {
        dispatch(updateAccounts(value))
    }

    const setQuery = (value: any) => {
        dispatch(updateQuery(value))
    }


    return {
        accounts,
        setAccounts,
        query,
        setQuery
    };
}