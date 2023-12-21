export const DOMEN = "http://127.0.0.1:8000/"

export const requestTime = 1000

export const iAccountMock = {
    
        id: 1,
        type: "card",
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
        type: "card",
        name: "INK No Limits",
        amount: "100",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 2,
        type: "card",
        name: "INK No Limits",
        amount: "200",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 3,
        type: "card",
        name: "INK No Limits",
        amount: "300",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 4,
        type: "card",
        name: "INK No Limits",
        amount: "400",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 5,
        type: "card",
        name: "INK No Limits",
        amount: "500",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
    {
        id: 6,
        type: "card",
        name: "INK No Limits",
        amount: "600",
        number: 23213213,
        currency: 810,
        bic: 2018321,
        icon: "icon",
        available: true
    },
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