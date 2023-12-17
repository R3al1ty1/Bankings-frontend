import ApplicationInfo from "./ApplicationInfo/ApplicationInfo";
import { useParams } from "react-router-dom";
import {Application} from "../../Types";
import {Dispatch} from "react";

const ApplicationPage = ({ selectedApplication, setSelectedApplication }: { selectedApplication:Application | undefined, setSelectedApplication: Dispatch<Application | undefined> }) => {
    const { id } = useParams<{id?: string}>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (
        <ApplicationInfo application_id={parseInt(id)} selectedApplication={selectedApplication} setSelectedApplication={setSelectedApplication} />
    )
}

export default  ApplicationPage;