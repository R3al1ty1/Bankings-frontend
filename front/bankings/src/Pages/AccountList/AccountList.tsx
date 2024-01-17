import "./AccountList.css";
import * as React from 'react';
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import AccountTable from "./AccountTable";
import { Response } from "../../Types";
import { Account, AccountsContextType, iAccountsContextState } from "../../Types";
import { requestTime } from "../../Consts";
import axios from "axios";
import { useToken } from "../../hooks/useToken";
import { useAuth } from "../../hooks/useAuth";
import Switch from "react-switch";

export const AccountsContext = React.createContext<AccountsContextType>(iAccountsContextState)

const AccountList = () => {
    const { access_token } = useToken();
    const { is_moderator } = useAuth()
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [query, setQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<"table" | "cards">("table");

    const searchAccounts = async () => {
        try {
            let apiUrl = ''
            if (is_moderator) {
                apiUrl = `http://127.0.0.1:8000/api/accounts/mod?query=${query}`;
            } else {
                apiUrl = `http://127.0.0.1:8000/api/accounts/search?query=${query}`;
            }

            const response: Response = await axios(apiUrl, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (response.status === 200) {
                setAccounts(response.data);
            }

        } catch (e) {
            // Обработка ошибок
        }
    };

    useEffect(() => {
        searchAccounts();
    }, [query, is_moderator]);

    const toggleViewMode = () => {
        setViewMode(viewMode === "table" ? "cards" : "table");
    };

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts }}>
            <div className="accounts-wrapper">
                <div className="filters-container">
                    <div className="toggle">
                        {is_moderator && (
                            <div className="switch-container">
                                <span>Таблица/карточки:</span>
                                <Switch
                                    checked={viewMode === "table"}
                                    onChange={toggleViewMode}
                                    onColor="#61dafb"
                                    onHandleColor="#ffffff"
                                    handleDiameter={25}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={15}
                                    width={40}
                                />
                            </div>
                        )}
                    </div>
                    <div className={"bottom"}>
                    </div>
                    <div className="top">
                        <SearchBar fetchData={(query) => {
                            setQuery(query);
                        }} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="account-list-wrapper">
                        <div className="top-wrapper">
                        </div>
                        <div className="center-wrapper">
                            {is_moderator && viewMode === "table" ? (
                                <AccountTable data={accounts} />
                            ) : (
                                <SearchResultsList />
                            )}
                        </div>
                        <div className="bottom-wrapper">
                        </div>
                    </div>
                </div>
            </div>
        </AccountsContext.Provider>
    );
};

export default AccountList;
