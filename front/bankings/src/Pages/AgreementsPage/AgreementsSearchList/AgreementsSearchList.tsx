import SearchResult from "../AgreementsSearch/AgreementsSearch";
import {useContext} from "react";
import {AgreementsContext} from "../Agreements/Agreements";
import "./AgreementsSearchList.css";

const SearchResultsList = () => {

    const { agreements } = useContext(AgreementsContext)

    return (
        <div className="search-results-list">
            {  agreements.map(agreement  => (
                <SearchResult agreement={agreement} key={agreement.id}/>
            ))}
        </div>
    );
}

export default SearchResultsList;