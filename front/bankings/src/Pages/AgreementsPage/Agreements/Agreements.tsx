// @ts-ignore
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../../hooks/useToken";
import { requestTime } from "../../../Consts";
import { Agreement, AgreementsContextType, iAgreementsContextState, Response } from "../../../Types";
import AgreementsSearchList from "../AgreementsSearchList/AgreementsSearchList";
import "./Agreements.css";
import { useAuth } from "../../../hooks/useAuth";
import SearchBar from "../AgreementsSearchBar/SearchBar";
import { Link } from 'react-router-dom';
import AgreementsTable from "./AgreementsTable";
import Switch from "react-switch";

export const AgreementsContext = React.createContext<AgreementsContextType>(iAgreementsContextState);

const Agreements = () => {
    const { access_token } = useToken();
    const { is_moderator } = useAuth();
    const [agreements, setAgreements] = useState<Agreement[]>([]);
    const { is_authenticated } = useAuth();
    const [query, setQuery] = useState<string>("");
    const [viewMode, setViewMode] = useState<"table" | "cards">("table");  // Добавлено состояние для отслеживания режима просмотра

    const handleDeleteAgreement = async (agreementId: number) => {
        // Логика удаления договора
        try {
            const apiUrl = `http://127.0.0.1:8000/api/agreements/${agreementId}/delete/`;
            const response = await axios.delete(apiUrl, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (response.status === 200) {
                setAgreements((prevAgreements) => prevAgreements.filter((agreement) => agreement.id !== agreementId));
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const searchAgreements = async () => {
        try {
            let apiUrl = '';
            if (is_authenticated) {
                apiUrl = `http://127.0.0.1:8000/api/agreements/mod?query=${query}`;
            } else {
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
            console.error(e);
        }
    };

    useEffect(() => {
        searchAgreements();
    }, [query, viewMode]);

    const toggleViewMode = () => {
        setViewMode(viewMode === "table" ? "cards" : "table");
    };

    if (is_authenticated) {
        return (
            <AgreementsContext.Provider value={{ agreements, setAgreements }}>
            <div className="accounts-wrapper">
                <div className="button-container">
                    {is_moderator ? (
                        <Link to="/agreements/add">
                            <button className="add-agreement-button">Добавить договор</button>
                        </Link>
                    ) : []}
                </div>
                <div className="bottom">
                    <div className="filters-container">
                        <div className="toggle">
                            {is_moderator && (
                                <div className="switch-container">
                                    <span>Таблица/карточки:</span>
                                        <Switch
                                            checked={viewMode === "cards"}
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
                        <div className="top-wraooer">
                            <SearchBar fetchData={(query) => {
                                setQuery(query);
                            }} />
                        </div>
                    </div>

                        <div className="center-wrapper">
                            {is_moderator && viewMode === "table" ? (
                                <AgreementsTable agreements={agreements} onDeleteAgreement={handleDeleteAgreement} />
                            ) : (
                                <AgreementsSearchList />
                            )}
                        </div>
                    <div className="bottom-wrapper"></div>
                </div>
            </div>
            </AgreementsContext.Provider>
        );
    } else {
        return (
            <AgreementsContext.Provider value={{ agreements, setAgreements }}>
            <div className="accounts-wrapper">
                <div className="bottom">
                    <div className="account-list-wrapper">
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
         </AgreementsContext.Provider>
        );
    }
};

export default Agreements;
