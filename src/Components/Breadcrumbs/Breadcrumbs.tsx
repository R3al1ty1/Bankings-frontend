import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css"
import {FaChevronRight} from "react-icons/fa";
import {useAccount} from "../../hooks/useAccount";

const Breadcrumbs = () => {

    const { account, setAccount } = useAccount()

    const resetSelectedAccount = () => setAccount(undefined)

    const location = useLocation()

    let currentLink = ''

    type Topics = {
        [key: string]: string;
    };

    const topics: Topics = {
        accounts: "Счета",
        draft: "Черновик",
        applications: "Заявки",
        agreements: "Договоры",
        home: "Главная",
        profile: "Профиль",
        login: "Вход",
        register: "Регистрация"
    };

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedAccount}>
                        {topics[crumb]}
                    </Link>


                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('accounts/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Счет { account?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className={"breadcrumbs-wrapper"}>
            <div className="breadcrumbs">

                <div className="crumb">

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;