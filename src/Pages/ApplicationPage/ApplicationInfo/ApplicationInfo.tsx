import "./ApplicationInfo.css"
import {Dispatch, useEffect} from "react";
import {Application} from "../../../Types";
import {requestTime, STATUSES} from "../../../Consts";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useApplicationForm} from "../../../hooks/useApplicationForm";
import {useDraftApplication} from "../../../hooks/useDraftApplication";
import {useToken} from "../../../hooks/useToken";

const ApplicationInfo = ({ application_id, selectedApplication, setSelectedApplication }:{ application_id:number | undefined, selectedApplication:Application| undefined, setSelectedApplication:Dispatch<Application | undefined> }) => {
    const {is_moderator} = useAuth()
    const {acceptApplication, dismissApplication} = useApplicationForm()
    const {sendApplication, deleteApplication} = useDraftApplication()
    const { access_token} = useToken();
    const navigate = useNavigate()

    const getStatusName = (statusId: number | undefined): string => {
        const foundStatus = STATUSES.find((status) => status.id === statusId);
        return foundStatus ? foundStatus.name : "Неизвестный статус";
    };

    const handleAcceptClick = () => {
        if (selectedApplication) {
            acceptApplication(selectedApplication.id);
        }
    };

    const handleAdd = async () => {
        await sendApplication()
        navigate("/applications")
    }

    const handleDelete = async () => {
        await deleteApplication()
        navigate("/accounts")
    }

    const handleDismissClick = () => {
        if (selectedApplication) {
            dismissApplication(selectedApplication.id);
        }
    };

    const handleDeleteAppAcc = async (accId: number, appId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/apps_accs/${accId}/${appId}/delete/`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (!response.ok) {
                console.error('Error:', response.statusText);
            } else {
                console.log('Successfully deleted');
                fetchData();
            }
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };


    const fetchData = async () => {

        try {
            const response1 = await fetch(`http://127.0.0.1:8000/api/applications/${application_id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response1.ok) {
            }

            const application: Application = await response1.json()

            setSelectedApplication(application)

        } catch (e) {


        }

    };

    useEffect(() => {
        fetchData()
    }, []);


    if (!selectedApplication) {
        return (
            <div>

            </div>
        )
    }
        return (
            <div className="application-info-background">
                <div className={"application-info-wrapper"}>

                    <div className="application-info-details">
                        <div className="application-info-details">
                            <div className="header-name">
                                <h3> Заявка № {selectedApplication.id}</h3>
                            </div>
                            <div className="header-name">
                                <h3>Статус заявки: {getStatusName(selectedApplication?.status)}</h3>
                            </div>

                        </div>
                        <div className="application-info-additional">
                            <table>
                                <thead>
                                <tr>
                                    <th>Тип счета</th>
                                    <th>Название</th>
                                    <th>Номер счета</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedApplication.accounts && selectedApplication.accounts.map(account => (
                                    <tr key={account.id}>
                                        <td>{account.type}</td>
                                        <td>{account.name}</td>
                                        <td>{account.number}</td>
                                        {selectedApplication.status === 1 &&
                                            <td>
                                                <button
                                                    className="draft-button"
                                                    onClick={() => handleDeleteAppAcc(account.id, selectedApplication.id)}>
                                                    Удалить
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="buttons-info">
                                <div className="home-button">
                                    <Link to={`/applications/`}>
                                        <button className="application-back-button">Вернуться к заявкам</button>
                                    </Link>
                                </div>
                                {selectedApplication.status == 1 &&
                                    <div className="buttons-container">

                                            <button className="draft-button" onClick={handleAdd}>Отправить</button>

                                            <button className="draft-button" onClick={handleDelete}>Удалить</button>

                                    </div>
                                }
                                    {is_moderator && selectedApplication.status == 2 &&
                                        <div className="buttons-container">
                                            <Link to={`/applications/`}>
                                            <button className="accept-button" onClick={handleAcceptClick}>
                                                Принять
                                            </button>
                                            </Link>
                                            <Link to={`/applications/`}>
                                            <button className="dismiss-button" onClick={handleDismissClick}>
                                                Отклонить
                                            </button>
                                            </Link>
                                        </div>
                                    }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    export default  ApplicationInfo;