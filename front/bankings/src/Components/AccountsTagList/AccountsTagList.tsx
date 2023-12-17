import "./AccountTagList.css"
import AccountTag from "./AccountTag/AccountTag";
import {Account, Application} from "../../Types";
import {Dispatch} from "react";

const AccountsTagList = ({application, setAccounts, readOnly=true}:{application:Application, setAccounts:Dispatch<Account[]>, readOnly:boolean}) => {

    if (application == undefined)
    {
        return (
            <div className="accounts-tag-list-wrapper">

            </div>
        )
    }

    const accounts = application.accounts.map(account => {
        return <AccountTag application={application} setAccounts={setAccounts} account={account} readOnly={readOnly} key={account.id} />
    })

    return (
        <div className="accounts-tag-list-wrapper">

            { accounts.length > 0 ? accounts : <span className="title">Счета не выбраны</span> }

        </div>
    )
}

export default AccountsTagList