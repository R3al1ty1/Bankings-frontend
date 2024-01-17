// @ts-ignore
import { TableInstance, useTable, usePagination } from 'react-table';
// @ts-ignore
import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';
import { Response } from '../../Types';
import { requestTime } from '../../Consts';

interface Account {
    id: number;
    name: string;
    type: string;
    number: number | null;
}

// @ts-ignore
const AccountTable = ({ data }: { data: Account[] }) => {
    const { access_token } = useToken();
    const [, setCurrentPage] = useState(0);
    const [query] = useState<string>("");
    const [, setAccounts] = useState<Account[]>([]);

    const searchAccounts = async () => {
        try {
            const apiUrl = `http://127.0.0.1:8000/api/accounts/mod?query=${query}`;

            const response: Response = await axios(apiUrl, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': access_token
                },
            });

            if (response.status === 200) {
                setAccounts(response.data);
            }

        } catch (e) {
            // Обработка ошибок
        }
    };

    useEffect(() => {
        searchAccounts();
    }, [query]);

    const COLUMNS = [
        {
            Header: '№',
            accessor: 'id',
            Cell: ({ value, row }: { value?: number; row: any }) => (
                <Link to={`/accounts/${row.original.id}`}>{value}</Link>
            ),
        },
        {
            Header: 'Название',
            accessor: 'name',
            Cell: ({ value }: { value?: string }) => value || 'Нет названия',
        },
        {
            Header: 'Тип счета',
            accessor: 'type',
            Cell: ({ value }: { value?: string }) => value || 'Нет типа',
        },
        {
            Header: 'Номер',
            accessor: 'number',
            Cell: ({ value }: { value?: string }) => value || 'Нет номера счета',
        },
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
    } = useTable(
        {
            columns: tableColumns,
            data,
            manualPagination: false,
            pageCount: Math.ceil(data.length / 10),
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    useEffect(() => {
        setCurrentPage(pageIndex);
    }, [pageIndex]);

    return (
        <div className="table-wrapper">
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
                <button
                    className="pagination-button"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    {'<<'}
                </button>{' '}
                <button
                    className="pagination-button"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {'<'}
                </button>{' '}
                <button
                    className="pagination-button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    {'>'}
                </button>{' '}
                <button
                    className="pagination-button"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
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

export default AccountTable;
