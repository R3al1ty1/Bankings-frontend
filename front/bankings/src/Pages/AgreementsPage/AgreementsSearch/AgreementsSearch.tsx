import {Link} from "react-router-dom";
import {Agreement} from "../../../Types";
import "./AgreementsSearch.css"
import {useAuth} from "../../../hooks/useAuth";

const SearchResult = ({ agreement }: { agreement: Agreement }) => {
    const agrTypeDictionary: Record<string, string> = {
        'Карта': 'card',
        'Кредитный счет': 'credit',
        'Вклад': 'deposit',
        'Сберегательный счет': 'save',
    };
    const icon = `http://127.0.0.1:8000/api/icon/agreement/`;
    const {is_authenticated} = useAuth()

    return (
        <div className="open-wrapper">
            <div className="agreements-card" key={agreement.id}>
                <img src={icon} className="account-icon" alt="Account Icon" />
                <h2>{agreement.small_desc}</h2>
                <div className="right-container">

                    <Link to={`/agreements/${agreement.id}`}>
                        <button className="agreement-info-button">Подробнее</button>
                    </Link>

                </div>
                <div className="bottom-container">
                    {is_authenticated && agrTypeDictionary[agreement.type] && (
                        <Link to={`/agreements/${agrTypeDictionary[agreement.type]}`}>
                            <button className="create-agr-button">Оформить счет</button>
                        </Link>
                    )}
                </div>
            </div>
    </div>

    );
}

export default SearchResult;