import {Link} from "react-router-dom";
import {Account} from "../../../Types";
// @ts-ignore
import React, {useContext} from "react";
import {AccountsContext} from "../AccountList";
import "./SearchResults.css"
import {useToken} from "../../../hooks/useToken";
// @ts-ignore
import cardImage from "../../AccountPage/AccountInfo/card.png";
// @ts-ignore
import saveImage from "../../AccountPage/AccountInfo/save.png"
import {DOMEN, iAccountsMock, requestTime} from "../../../Consts";

const SearchResult = ({ account }: { account: Account }) => {
    const {access_token} = useToken()
    const { setAccounts } = useContext(AccountsContext)
    function getCurrencySymbol(currencyCode: number) {
        switch (currencyCode) {
            case 643:
                return '₽';
            case 840:
                return '$';
            case 978:
                return '€';
            default:
                return '';
        }
    }

    function formatCurrency(amount: number) {
        return amount.toLocaleString('en-US');
    }
    const onDelete = async () => {

        try {
            const response = await fetch(`${DOMEN}/api/accounts/${account.id}/delete/`, {
                method: "DELETE",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (!response.ok){
                deleteMockAccount()
            }

            const accounts: Account[] = await response.json()

            setAccounts(accounts)

        } catch (e) {

            deleteMockAccount()

        }
    }

    const deleteMockAccount = () => {

        account.available = false

        setAccounts(iAccountsMock.filter(account => account.available == true))

    }
    if (account.type === "Карта") {
        const icon = `http://127.0.0.1:8000/api/icon/Карта/`;
        return (
            <div className="account" key={account.id}>
                <img src={icon} onError={(e) => e.currentTarget.src = cardImage} className="account-icon" alt="Agreement Icon" />
                <div className="left-container">
                    <span className="account-balance">{formatCurrency(Number(account.amount as string))} {getCurrencySymbol(account.currency)}</span>
                    <span className="account-name">{account.name}
                        <span className="card-digits">{account.card && account.card[0] && (
                        <span> ···· {String(account.card[0].number).slice(-4)}</span>)}</span>
                </span>
                </div>
                <div className="right-container">

                    <Link to={`/accounts/${account.id}`}>
                        <button className="account-info-button">Открыть</button>
                    </Link>

                    <button className="account-delete-button" onClick={onDelete}>Удалить</button>


                </div>
            </div>

        );
    }
    const icon = `http://127.0.0.1:8000/api/icon/${account.type}/`;
    if (account.type != undefined) {
        return (

            <div className="account" key={account.id}>
                <img src={icon} onError={(e) => e.currentTarget.src = saveImage} className="account-icon" alt="Agreement Icon" />
                <div className="left-container">
                    <span className="account-balance">{formatCurrency(Number(account.amount as string))} {getCurrencySymbol(account.currency)}</span>
                    <span className="account-name">{account.name}</span>
                </div>

                <div className="right-container">

                    <Link to={`/accounts/${account.id}`}>
                        <button className="account-info-button">Открыть</button>
                    </Link>

                    <button className="account-delete-button" onClick={onDelete}>Удалить</button>


                </div>
            </div>

        );
    }

}

export default SearchResult;