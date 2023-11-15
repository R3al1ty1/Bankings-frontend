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
    deposit?: Deposit[], // Теперь deposit - это массив Deposit или undefined
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
    agreement: null | any; // тип соглашения может отличаться, поставьте подходящий тип
    days: number;
    number_ref: number;
}

export interface Credit {
    id: number;
    interest_rate: number;
    payment_amount: number;
    creation_date: string;
    end_date: string;
    agreement: null | any; // тип соглашения может отличаться, поставьте подходящий тип
    payments_number: number;
    purpose: string;
    number_ref: number;
}

export interface Save {
    id: number;
    interest_rate: number;
    number_ref: number;
  }

export type AccountsContextType = {
    accounts: Account[],
    setAccounts: React.Dispatch<React.SetStateAction<Account[] | []>>
}

export const iAccountsContextState = {
    accounts: [],
    setAccounts: () => {}
}

export type SelectedAccountContextType = {
    selectedAccount: Account | null,
    setSelectedAccount: React.Dispatch<React.SetStateAction<Account | null>>
}

export const iSelectedAccountContextState = {
    selectedAccount: null,
    setSelectedAccount: () => {}
}