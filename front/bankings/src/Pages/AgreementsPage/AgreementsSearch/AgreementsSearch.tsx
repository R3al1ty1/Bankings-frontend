import { Link } from "react-router-dom";
import { Agreement } from "../../../Types";
import "./AgreementsSearch.css";
import { useAuth } from "../../../hooks/useAuth";
import { useToken } from "../../../hooks/useToken";

interface SearchResultProps {
    agreement: Agreement;
    onDeleteAgreement: () => void;
}

const agrTypeDictionary: Record<string, string> = {
    'Карта': 'card',
    'Кредитный счет': 'credit',
    'Вклад': 'deposit',
    'Сберегательный счет': 'save',
};

const SearchResult: React.FC<SearchResultProps> = ({ agreement, onDeleteAgreement }) => {
    const { access_token } = useToken();
    const { is_authenticated, is_moderator } = useAuth();

    const deleteAgreement = () => {
        fetch(`http://127.0.0.1:8000/api/agreements/${agreement.id}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': access_token
            },
        })
            .then((response) => {
                if (response.ok) {
                    onDeleteAgreement();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const icon = `http://127.0.0.1:8000/api/icon/agreement/`;
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
                {is_moderator && (
                    <div className="mod-container">
                        <button className="create-agr-button" onClick={deleteAgreement}>Удалить</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
