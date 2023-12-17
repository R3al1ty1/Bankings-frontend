import "./AccountList.css"
import * as React from 'react'
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import {Response} from "../../Types";
import {Account,AccountsContextType, iAccountsContextState} from "../../Types";
import {requestTime} from "../../Consts";
import axios from "axios";
import {useToken} from "../../hooks/useToken";

export const AccountsContext = React.createContext<AccountsContextType>(iAccountsContextState)

const AccountList = () => {

    const {access_token} = useToken()

    const [accounts, setAccounts] = useState<Account[]>([]);

    const [query, setQuery] = useState<string>("");

    const searchAccounts = async () => {

        try {

            const response:Response = await axios(`http://127.0.0.1:8000/api/accounts/search?query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            })

            if (response.status == 200){
                setAccounts(response.data)
            }

        } catch (e) {


        }
    }

    useEffect(() => {
        searchAccounts()
    }, [query])

    return (
        <AccountsContext.Provider value={{accounts, setAccounts}}>
            <div className="accounts-wrapper">

                <div className="filters-container">

                    <div className="top">


                        <SearchBar fetchData={(query) => {
                            setQuery(query)
                        }}/>

                    </div>

                    <div className={"bottom"}>


                    </div>



                </div>

                <div className="bottom">
                    <div className="account-list-wrapper">

                        <div className="top-wrapper">

                        </div>

                        <div className="center-wrapper">

                            { <SearchResultsList /> }

                        </div>

                        <div className="bottom-wrapper">

                        </div>

                    </div>
                </div>

            </div>
        </AccountsContext.Provider>

    );
}

export default AccountList;