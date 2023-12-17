import "./ApplicationConstructor.css"
import {useDraftApplication} from "../../hooks/useDraftApplication";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const ApplicationConstructor = () => {

    const {application, fetchDraftApplication} = useDraftApplication()

    useEffect(() => {
        fetchDraftApplication()
    }, [])

    return (
        <Link to="/applications/draft/" className="application-constructor-container">
            <span className="title">Ваша заявка</span>
            {application?.accounts.length > 0 && <span className="badge">{application?.accounts.length}</span>}
        </Link>
    )
}

export default ApplicationConstructor;