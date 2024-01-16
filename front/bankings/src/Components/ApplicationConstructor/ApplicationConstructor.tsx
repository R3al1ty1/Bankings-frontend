import "./ApplicationConstructor.css";
import { useDraftApplication } from "../../hooks/useDraftApplication";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ApplicationConstructor = () => {
    const { application, fetchDraftApplication } = useDraftApplication();

    useEffect(() => {
        fetchDraftApplication();
    }, []);

    // Предположим, что у вас есть appId в application, если нет - установите значение по умолчанию
    const id = application?.id || 0;

    if (id === 0) {
        return (
            <Link to={`/applications/empty/`} className="application-constructor-container">
                <span className="title">Ваша заявка</span>
            </Link>
        );
    }

    return (
        <Link to={`/applications/${id}/`} className="application-constructor-container">
            <span className="title">Ваша заявка</span>
            {application?.accounts.length > 0 && <span className="badge">{application?.accounts.length}</span>}
        </Link>
    );
};

export default ApplicationConstructor;
