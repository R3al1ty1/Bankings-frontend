import "./AccountList.css"
import * as React from 'react'
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import {Account,AccountsContextType, iAccountsContextState} from "../../Types";
import {iAccountMock} from "../../Consts";

export const AccountsContext = React.createContext<AccountsContextType>(iAccountsContextState)

const AccountList = () => {

    const [accounts, setAccounts] = useState<Account[]>([]);

    const [query, setQuery] = useState<string>("");

    const searchAccounts = () => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        setTimeout(() => {
            controller.abort(); // Прерываем запрос через определенное время (например, 30 секунд)
        }, 30000); // 30000 миллисекунд = 30 секунд
    
        fetch(`http://127.0.0.1:8000/api/accounts/search?query=${query}`, { signal })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
    
                throw new Error('Something went wrong');
            })
            .then((results) => {
                setAccounts(results);
            })
            .catch((error) => {
                console.log(error);
                const mockAccount = iAccountMock;
                setAccounts([mockAccount]);
            });
    };

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