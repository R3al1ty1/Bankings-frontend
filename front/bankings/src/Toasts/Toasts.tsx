import {toast} from "react-toastify";

export const successMessage = (username: string) => {
    toast.success(`Добро пожаловать, ${username}!`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const errorMessage = () => {
    toast.error(`Неправильный логин или пароль`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const logOutMessage = () => {
    toast.info(`Вы вышли из аккаунта`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}

export const accountAlreadyAddedMessage = () => {
    toast.warning(`Вы уже добавили этот счет в заявку`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const accountAddedMessage = (account_name: string, application_id: number) => {
    toast.success(`Счет ${account_name} успешно добавлен в заявку №${application_id}`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const accountRemoveMessage = (account_name: string, application_id: number) => {
    toast.info(`Счет ${account_name} успешно удален из заявки №${application_id}`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const applicationDeleteMessage = (id: number) => {
    toast.info(`Заявка №${id} успешно удалено`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const applicationSendMessage = (id: number) => {
    toast.success(`Заявка №${id} успешно отправлена`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const applicationSaveMessage = (id: number) => {
    toast.success(`Заявка №${id} успешно сохранена`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const requestErrorMessage = () => {
    toast.error(`Что-то пошло не так`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const emptyAccountsMessage = () => {
    toast.warning(`Добавьте счет в заявку`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};