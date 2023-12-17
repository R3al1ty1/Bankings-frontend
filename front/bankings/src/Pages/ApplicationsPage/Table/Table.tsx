// @ts-ignore
import {TableInstance, useTable, usePagination} from "react-table"
// @ts-ignore
import React, {useMemo} from "react";
import "./Table.css"
import axios from "axios";
import {STATUSES} from "../../../Consts";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {useQuery} from "react-query";
import {useToken} from "../../../hooks/useToken";

export const ApplicationsTable = () => {

    const { access_token } = useToken()

    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }: { value?: number }) => {
                const foundStatus = STATUSES.find((status) => status.id === value);
                return foundStatus ? foundStatus.name : "Неизвестный статус";
            }

        },
        {
            Header: "Счета",
            accessor: "accounts",
            Cell: ({ value }: { value?: { name: string }[] }) => {
                if (value) {
                    return value.map((account) => account.name).join(', ');
                }
                return "Нет счетов";
            }

        },
        {
            Header: "Дата формирования",
            accessor: "creation_date",
            Cell: ({ value }: { value?: string }) => {

                if (value) {
                    const parsedDate = format(new Date(value), "d MMMM yyyy 'г.'", { locale: ruLocale });
                    return parsedDate;
                }
                return "Нет даты";
            }
        }
    ]
    const fetchApplicationsData = async () => {

        const {data} = await axios(`http://127.0.0.1:8000/api/applications/`, {
            method: "GET",
            headers: {
                'authorization': `${access_token}`
            }
        })

        return data

    }

    const { isLoading, error, data, isSuccess } = useQuery(
        ['applications'],
        () => fetchApplicationsData(),
        {
            keepPreviousData: true,
        }
    );

    const tableColumns = useMemo(() => COLUMNS, [])

    const tableInstance = useTable<TableInstance>({
        columns:tableColumns,
        data: isSuccess ? data : [],
        initialState: {
            pageIndex: 0,
            pageSize: 10
        },
        manualPagination: true,
        pageCount: 1,
    }, usePagination)


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = tableInstance


    if (error) {
        return <p>Error</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (
        <div className="table-wrapper">

            <table {...getTableProps()} className="orders-table">
                <thead>
                {
                    headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))

                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row: any) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell: any) => {
                                const isIdCell = cell.column.id === 'id';
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        key={cell.column.id}
                                        style={{ cursor: isIdCell ? 'pointer' : 'default' }}
                                    >
                                        {isIdCell ? (
                                            <Link to={`/applications/${row.original.id}/`}>
                                                {row.original.id}
                                            </Link>
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
}