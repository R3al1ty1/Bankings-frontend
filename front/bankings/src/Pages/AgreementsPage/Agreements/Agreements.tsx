// @ts-ignore
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useToken} from "../../../hooks/useToken";
import {requestTime} from "../../../Consts";
import {Agreement, AgreementsContextType, iAgreementsContextState, Response} from "../../../Types";
import AgreementsSearchList from "../AgreementsSearchList/AgreementsSearchList";
import "./Agreements.css"
import AgreementsOpen from "../AgreementsOpen/AgreementsOpen";
import {useAuth} from "../../../hooks/useAuth";
import SearchBar from "../AgreementsSearchBar/SearchBar";
import { Link } from 'react-router-dom';

export const AgreementsContext = React.createContext<AgreementsContextType>(iAgreementsContextState)

export const Agreements = () => {
    const {access_token} = useToken();
    const {is_moderator} = useAuth()
    const [agreements, setAgreements] = useState<Agreement[]>([]);
    const {is_authenticated} = useAuth()
    const [query, setQuery] = useState<string>("");

    const searchAgreements = async () => {
        try {
            let apiUrl = ''
            if (is_moderator) {
                apiUrl = `http://127.0.0.1:8000/api/agreements/mod?query=${query}`;
            }
            else{
                apiUrl = `http://127.0.0.1:8000/api/agreements/`;
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
                setAgreements(response.data);
            }

        } catch (e) {
            // Обработка ошибок
        }
    };

    useEffect(() => {
        searchAgreements();
    }, [query]);
    if (is_moderator) {
        return (
            <div className="accounts-wrapper">
                <div className="button-container">
                <Link to="/agreements/add">
                    <button className="add-agreement-button">Добавить договор</button>
                </Link>
                </div>
                <div className="bottom">
                    <div className="account-list-wrapper">
                        <div className="top-wrapper">
                            <AgreementsOpen />
                                <SearchBar fetchData={(query) => {
                                    setQuery(query);
                                }}/>
                        </div>
                        <AgreementsContext.Provider value={{ agreements, setAgreements }}>
                                <div className="center-wrapper">
                                    <AgreementsSearchList />
                                </div>
                        </AgreementsContext.Provider>
                        <div className="bottom-wrapper">
                        </div>
                    </div>
                </div>
            </div>

        );
    }
    else {
        return (

            <div className="accounts-wrapper">
                <div className="bottom">
                    <div className="account-list-wrapper">
                        <div className="top-wrapper">
                            <AgreementsOpen />
                        </div>
                        <AgreementsContext.Provider value={{ agreements, setAgreements }}>
                            {is_authenticated ? (
                                <div className="center-wrapper">
                                    <h2 className="my-agreements">Ваши договоры</h2>
                                    <AgreementsSearchList />
                                </div>
                            ) : null}
                        </AgreementsContext.Provider>
                        <div className="bottom-wrapper">
                        </div>
                    </div>
                </div>
            </div>

        );
    }
};

export default Agreements;
