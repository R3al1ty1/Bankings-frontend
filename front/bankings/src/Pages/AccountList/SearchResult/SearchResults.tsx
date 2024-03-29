import {Link} from "react-router-dom";
import {Account} from "../../../Types";
import {useContext} from "react";
import {AccountsContext} from "../AccountList";
import "./SearchResults.css"
import {useToken} from "../../../hooks/useToken";

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
    const onDelete = () => {
        fetch(`http://127.0.0.1:8000/api/accounts/${account.id}/delete/`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': access_token
            },
        })
            .then((response) => {
                if (response.ok){
                    return response.json()
                }

                throw new Error('Something went wrong');
            })
            .then((results) => {
                setAccounts(results)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    if (account.type === "Карта") {
        const icon = `http://127.0.0.1:8000/api/icon/Карта/`;
        return (
            <div className="account" key={account.id}>
                <img src={icon} className="account-image" alt="Account Logo" />
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
                <img src={icon} className="account-image" alt="Account Logo" />
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