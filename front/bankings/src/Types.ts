import {AxiosResponse} from "axios";

export interface Account {
    id: number,
    type: string,
    name: string,
    amount: string,
    number: number,
    currency: number,
    bic: number,
    icon: string,
    available: boolean,
    deposit?: Deposit[],
    save?: Save[],
    credit?: Credit[],
    card?: Card[]
}
export interface Card {
    id: number;
    number: number;
    cvv: number;
    holder_first_name: string;
    holder_last_name: string;
    maintenance_cost: number;
    exp_date: string;
    number_ref: number;
}

export interface Deposit {
    id: number;
    interest_rate: number;
    creation_date: string;
    end_date: string;
    agreement: null | any;
    days: number;
    number_ref: number;
}

export interface Credit {
    id: number;
    interest_rate: number;
    payment_amount: number;
    creation_date: string;
    end_date: string;
    agreement: null | any;
    payments_number: number;
    purpose: string;
    number_ref: number;
}

export interface Save {
    id: number;
    interest_rate: number;
    number_ref: number;
  }


export interface Application {
    id: number,
    status: number,
    accounts: Account[],
    creation_date: string,
    procession_date: string,
    completion_date: string,
}

export type AccountsContextType = {
    accounts: Account[],
    setAccounts: React.Dispatch<React.SetStateAction<Account[] | []>>
}

export type ApplicationsContextType = {
    applications: Application[],
    setApplications: React.Dispatch<React.SetStateAction<Application[] | []>>
}

export const iApplicationsContextState = {
    applications: [],
    setApplications: () => {}
}

export const iAccountsContextState = {
    accounts: [],
    setAccounts: () => {}
}

export type SelectedAccountContextType = {
    selectedAccount: Account | null,
    setSelectedAccount: React.Dispatch<React.SetStateAction<Account | null>>
}

export interface Option {
    id: number,
    name: string
}

export interface DropdownMenuList {
    options: Option[],
    defaultTitle: string,
    appendDefaultTitle: boolean,
    setSelectedOption: (id: number) => void,
    isDisabled: boolean
}
export const iSelectedAccountContextState = {
    selectedAccount: null,
    setSelectedAccount: () => {}
}

export type Response<T = any> = Promise<AxiosResponse<T>> | any;