// @ts-ignore
import { TableInstance, useTable, usePagination } from 'react-table';
// @ts-ignore
import React, { useMemo, useState, useEffect } from 'react';
import './Table.css';
import axios from 'axios';
import {STATUSES} from '../../../Consts';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { useToken } from '../../../hooks/useToken';
import { useAuth } from '../../../hooks/useAuth';
import {useApplicationForm} from "../../../hooks/useApplicationForm";

interface Application {
    id: number;
    status: number;
    accounts: { name: string, number: number}[];
    creation_date: string;
    number: number | null;
    user_email: string;
}


export const ApplicationsTable = () => {
    const { access_token } = useToken();
    const { is_moderator } = useAuth();
    const [data, setData] = useState<Application[]>([]);
    const [, setFilteredData] = useState<Application[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [, setError] = useState<Error | null>(null);
    const [, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [userEmailFilter, setUserEmailFilter] = useState<string | null>(null);
    const {acceptApplication, dismissApplication} = useApplicationForm()

    const fetchApplicationsData = async () => {
        try {
            const appsUrl = is_moderator
                ? 'http://127.0.0.1:8000/api/applications/mod'
                : 'http://127.0.0.1:8000/api/applications/';

            const { data } = await axios.get<Application[]>(appsUrl, {
                headers: {
                    Authorization: access_token,
                },
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    status: selectedStatus,
                    user_email: is_moderator ? userEmailFilter : undefined,
                },
            });

            const applicationsWithNumbers = data.map(application => {
                // Добавляем поле 'numbers' к каждому объекту Application
                const appsAccs = application.accounts || [];
                const numbers = appsAccs.map(acc => acc.number);
                return {
                    ...application,
                    numbers,
                };
            });

            setData(applicationsWithNumbers);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchApplicationsData();
    }, [access_token, is_moderator, startDate, endDate, selectedStatus]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchApplicationsData();
        }, 10000); // Интервал обновления данных каждые 10 секунд

        return () => clearInterval(intervalId);
    }, [access_token, is_moderator, startDate, endDate, selectedStatus]);

    useEffect(() => {
        let filteredApplications = data;

        if (startDate) {
            filteredApplications = filteredApplications.filter(
                (application) => new Date(application.creation_date) >= new Date(startDate)
            );
        }

        if (endDate) {
            filteredApplications = filteredApplications.filter(
                (application) => new Date(application.creation_date) <= new Date(endDate)
            );
        }

        if (selectedStatus) {
            filteredApplications = filteredApplications.filter(
                (application) => application.status === parseInt(selectedStatus, 10)
            );
        }

        if (userEmailFilter) {
            filteredApplications = filteredApplications.filter(
                (application) => application.user_email.includes(userEmailFilter)
            );
        }

        setFilteredData(filteredApplications);
    }, [data, startDate, endDate, selectedStatus, userEmailFilter]);

    const ACTIONS_COLUMN = {
        Header: 'Действия',
        accessor: 'actions',
        Cell: ({ row }: { row: any }) => (
            is_moderator && row.original.status === 2 && (
                <div className="buttons-container">
                    <Link to={`/applications/`}>
                        <button className="accept-button" onClick={() => handleAcceptClick(row.original)}>
                            Принять
                        </button>
                    </Link>
                    <Link to={`/applications/`}>
                        <button className="dismiss-button" onClick={() => handleDismissClick(row.original)}>
                            Отклонить
                        </button>
                    </Link>
                </div>
            )
        ),
    };

    const handleAcceptClick = async (application: Application) => {
        if (application.status === 2) {
            acceptApplication(application.id);
        }
    };

    const handleDismissClick = async (application: Application) => {
        if (application.status === 2) {
            dismissApplication(application.id);
        }

    };

    const COLUMNS = [
        {
            Header: '№',
            accessor: 'id',
            Cell: ({ value, row }: { value?: number; row: any }) => (
                <Link to={`/applications/${row.original.id}`}>{value}</Link>
            ),
        },
        ...(is_moderator
            ? [
                {
                    Header: 'Почта',
                    accessor: 'user_email',
                    Cell: ({ value }: { value?: string }) => value || 'Нет почты',
                },
            ]
            : []),
        {
            Header: 'Статус',
            accessor: 'status',
            Cell: ({ value }: { value?: number }) => {
                const foundStatus = STATUSES.find((status) => status.id === value);
                return foundStatus ? foundStatus.name : 'Неизвестный статус';
            },
        },
        {
            Header: 'Счета',
            accessor: 'accounts',
            Cell: ({ value }: { value?: { name: string }[] }) => {
                if (value) {
                    return value.map((account) => account.name).join(', ');
                }
                return 'Нет счетов';
            },
        },
        {
            Header: 'Дата формирования',
            accessor: 'creation_date',
            Cell: ({ value }: { value?: string }) => {
                if (value) {
                    // @ts-ignore
                    const parsedDate = format(new Date(value), "d MMMM yyyy 'г.' HH:mm", { locale: ruLocale });
                    return parsedDate;
                }
                return 'Нет даты';
            },
        },
        {
            Header: 'Номера счетов',
            accessor: 'numbers',
            Cell: ({ value }: { value?: number[] }) => {
                if (value) {
                    return value.map((number, index) => (
                        <span key={index}>{number}{index < value.length - 1 ? ', ' : ''}</span>
                    ));
                }
                return 'Нет номеров счетов';
            },
        },
        ...(is_moderator
            ? [
                ACTIONS_COLUMN
            ]
            : []),

    ];

    const tableColumns = useMemo(() => COLUMNS, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable<TableInstance>(
        {
            columns: tableColumns,
            data: useMemo(() => {
                let filteredApplications = data;

                // Фильтрация данных
                if (startDate) {
                    filteredApplications = filteredApplications.filter(
                        (application) => new Date(application.creation_date) >= new Date(startDate)
                    );
                }

                if (endDate) {
                    filteredApplications = filteredApplications.filter(
                        (application) => new Date(application.creation_date) <= new Date(endDate)
                    );
                }

                if (selectedStatus) {
                    filteredApplications = filteredApplications.filter(
                        (application) => application.status === parseInt(selectedStatus, 10)
                    );
                }

                if (userEmailFilter) {
                    filteredApplications = filteredApplications.filter(
                        (application) => application.user_email.includes(userEmailFilter)
                    );
                }

                return filteredApplications;
            }, [data, startDate, endDate, selectedStatus, userEmailFilter]),
            manualPagination: false,
            pageCount: Math.ceil(data.length / 10),
            initialState: { pageIndex: currentPage },
        },
        usePagination
    );

    useEffect(() => {
        setCurrentPage(pageIndex);
    }, [pageIndex]);


    const handleStartDateChange = (date: string) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div className="table-wrapper">
            <div className="filters">
                <label>
                    Стартовая дата:
                    <input className="start-date" type="date" onChange={(e) => handleStartDateChange(e.target.value)} />
                </label>
                <label>
                    Конечная дата:
                    <input className="end-date" type="date" onChange={(e) => handleEndDateChange(e.target.value)} />
                </label>
                <label>
                    Статус:
                    <select className="status-box" onChange={(e) => handleStatusChange(e.target.value)}>
                        <option value="">Все</option>
                        {STATUSES.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </label>
                {is_moderator && (
                    <label>
                        Почта:
                        <input
                            className="user-email"
                            type="text"
                            placeholder="Введите почту"
                            onChange={(e) => setUserEmailFilter(e.target.value)}
                        />
                    </label>
                )}


            </div>

            <table {...getTableProps()} className="orders-table">
                <thead>
                {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row: any) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell: any) => (
                                <td
                                    {...cell.getCellProps()}
                                    key={cell.column.id}
                                    style={{ cursor: 'default' }}
                                >
                                    {cell.render('Cell')}
                                </td>

                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="pagination">
                <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                Страница{' '}
                    <strong>
                    {pageIndex + 1} из {pageOptions.length}
                </strong>{' '}
            </span>
                <span>
                | Перейти на страницу:{' '}
                    <input
                        type="number"
                        value={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '50px' }}
                    />
            </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 15, 20, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Показать {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
