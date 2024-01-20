import SearchResult from "../AgreementsSearch/AgreementsSearch";
import { useContext } from "react";
import { AgreementsContext } from "../Agreements/Agreements";
import "./AgreementsSearchList.css";

const AgreementsSearchList = () => {
    const { agreements, setAgreements } = useContext(AgreementsContext);

    const onDeleteAgreement = (deletedAgreementId: number) => {
        setAgreements((prevAgreements) => prevAgreements.filter((agreement) => agreement.id !== deletedAgreementId));
    };

    return (
        <div className="search-results-list">
            {agreements.map(agreement => (
                <SearchResult
                    agreement={agreement}
                    key={agreement.id}
                    onDeleteAgreement={() => onDeleteAgreement(agreement.id)}
                />
            ))}
        </div>
    );
}

export default AgreementsSearchList;
