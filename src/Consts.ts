export const DOMEN = "http://127.0.0.1:8000/"

export const requestTime = 1000

export const iAccountMock = {
    
        id: 1,
        type: "Карта",
        name: "INK No Limits",
        amount: "400",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true,
        save: []
}

export const iAccountsMock = [
    {
        id: 1,
        type: "Карта",
        name: "INK No Limits",
        amount: "100",
        number: 23213213,
        currency: 840,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 2,
        type: "Вклад",
        name: "Выгодный",
        amount: "20000",
        number: 23213213,
        currency: 643,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 4,
        type: "Карта",
        name: "INK No Limits",
        amount: "400",
        number: 23213213,
        currency: 643,
        bic: 2018321,
        icon: "icon",
        available: true
    }
]

interface Option {
    id: number;
    name: string;
}

export const STATUSES : Option[] = [
    {
        id: 1,
        name: "Черновик"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Одобрен"
    },
    {
        id: 4,
        name: "Отклонен"
    },
    {
        id: 5,
        name: "Удален"
    }
]