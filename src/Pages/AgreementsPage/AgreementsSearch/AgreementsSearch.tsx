import {Link} from "react-router-dom";
import {Agreement} from "../../../Types";
import "./AgreementsSearch.css"

const SearchResult = ({ agreement }: { agreement: Agreement }) => {
    return (

        <div className="agreement" key={agreement.id}>
            <div className="left-container">
                <span className="agreement-type">Договор для счетов типа "{agreement.type}"</span>
            </div>

            <div className="right-container">

                <Link to={`/agreements/${agreement.id}`}>
                    <button className="agreement-info-button">Подробнее</button>
                </Link>


            </div>
        </div>

    );
}

export default SearchResult;