import "./AgreementPage.css"
import AgreementInfo from "./AgreementInfo/AgreementInfo";
import { useParams } from "react-router-dom";
import {Agreement} from "../../Types";
import {Dispatch, useEffect, useState} from "react";

const AgreementPage = ({ selectedAgreement, setSelectedAgreement}: { selectedAgreement: Agreement | undefined, setSelectedAgreement: Dispatch<Agreement | undefined> }) => {
    const { id } = useParams<{ id?: string }>();
    const [agreementType, setAgreementType] = useState<string | undefined>();
    const [userID, setUserID] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/agreements/${id}/`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    const agreementType = data.type;
                    const userID = data.user_id_refer
                    setSelectedAgreement(data);
                    setAgreementType(agreementType);
                    setUserID(userID)
                } else {
                    console.error('Request failed:', response.status, response.statusText);
                }
            } catch (e) {
                console.error('Error:', e);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, setSelectedAgreement]);

    if (id == undefined) {
        return <div>404</div>;
    }
    return (
        <AgreementInfo
            agreement_id={parseInt(id)}
            // @ts-ignore
            agreement_type={agreementType}
            // @ts-ignore
            user_id_refer={userID}
            selectedAgreement={selectedAgreement}
            setSelectedAgreement={setSelectedAgreement}
        />
    );};

export default AgreementPage;
