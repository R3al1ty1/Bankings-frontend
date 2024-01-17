import "./AccountTag.css"
import {AiOutlineClose} from "react-icons/ai";
import {DOMEN} from "../../../Consts";
import {Response} from "../../../Types";
import axios from "axios";
import {useToken} from "../../../hooks/useToken";
import {accountRemoveMessage} from "../../../Toasts/Toasts";

const AccountTag = ({ application, setAccounts, account, readOnly }: { application: any, setAccounts: any, account: any, readOnly: any }) => {

    const { access_token } = useToken()

    const removeAccount = async () => {
        const response: Response | any = await axios(`${DOMEN}api/apps_accs/${account.id}/${application.id}}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            },
        });

        console.log(response.data)

        setAccounts(response.data)

        accountRemoveMessage(account?.name, application.id)
    }

    return (
        <div className="tag-item">
            <span>{account?.name}</span>
            {!readOnly && <AiOutlineClose className="close-btn" onClick={removeAccount}/> }
        </div>
    )
}

export default AccountTag;