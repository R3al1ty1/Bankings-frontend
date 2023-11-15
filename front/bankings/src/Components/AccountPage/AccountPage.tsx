import "./AccountPage.css"
import AccountInfo from "./AccountInfo/AccountInfo";
import { useParams } from "react-router-dom";
import {Account} from "../../Types";
import {Dispatch} from "react";


const AccountPage = ({ selectedAccount, setSelectedAccount }: { selectedAccount:Account | undefined, setSelectedAccount: Dispatch<Account | undefined> }) => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <AccountInfo account_id={parseInt(id)} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
    )
}

export default  AccountPage;