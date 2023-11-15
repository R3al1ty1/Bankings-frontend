import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css"
import {Account} from "../../Types";
import {Dispatch} from "react";

const Breadcrumbs = ({ selectedAccount, setSelectedAccount }: { selectedAccount:Account | undefined, setSelectedAccount: Dispatch<Account | undefined> }) => {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "accounts")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedAccount(undefined)}>
                        Счета
                    </Link>


                </div>
            )
        }

        if (currentLink.match(new RegExp('accounts/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedAccount?.name}
                    </Link>


                </div>
            )
        }
    });

    return (
        <div className={"breadcrumbs-wrapper"}>
            <div className={"breadcrumbs"}>

                <div className="crumb">

                    <Link to={"/"}>

                    </Link>



                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;