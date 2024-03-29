import "./ApplicationConstructor.css";
import { useDraftApplication } from "../../hooks/useDraftApplication";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ApplicationConstructor = () => {
    const { application, fetchDraftApplication } = useDraftApplication();

    useEffect(() => {
        fetchDraftApplication();
    }, []);
    const id = application?.id || 0;

    if (id === 0) {
        return (
            <Link to={`/applications/empty/`} className="application-constructor-container">
                <span className="title">Ваша заявка</span>
            </Link>
        );
    }

    return (
        <Link
            to={`/applications/${id}/`}
            className={`application-constructor-container ${application?.accounts.length === 0 ? 'inactive' : 'active'}`}>
            <span className="title">Ваша заявка</span>
        </Link>
    );
};

export default ApplicationConstructor;
