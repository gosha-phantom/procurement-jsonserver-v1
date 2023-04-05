import { useEffect, useMemo, useState } from 'react';
import {
	useTable, useGlobalFilter, useFilters, useSortBy, usePagination, useRowSelect, useColumnOrder,
} from 'react-table';

import { ReactComponent as SortIcon } from 'shared/assets/icons/sort-sortable.svg';
import { ReactComponent as SortAscIcon } from 'shared/assets/icons/sort-asc-sortable.svg';
import { ReactComponent as SortDescIcon } from 'shared/assets/icons/sort-desc-sortable.svg';
import { CheckboxRowSelect } from 'shared/ui/ReactTable/ui/CheckboxRowSelect/CheckboxRowSelect';
import { GlobalFilter } from 'shared/ui/ReactTable/ui/GlobalFilter/GlobalFilter';

import { getUsersFromFakeAPI } from '../model/ReactTable.services';
import { PostsFromFakeAPI } from '../model/ReactTable.types';
import { ReactTableColumnsExample } from '../model/ReactTable.columns';

import '../styles/ReactTable.module.scss';


export const ColumnOrderReactTable = () => {
	const [tableData, setTableData] = useState<PostsFromFakeAPI[]>([]);

	const memoizedTableColumns = useMemo(() => ReactTableColumnsExample, []);
	const memoizedTableData = useMemo(() => tableData, [tableData]);

	useEffect(() => {
		getUsersFromFakeAPI().then((data) => {
			// console.log(data);
			setTableData(data);
		});
	}, []);

	const tableInstance = useTable({
		// @ts-ignore
		columns: memoizedTableColumns,
		data: memoizedTableData
	},
	useGlobalFilter, useFilters, useSortBy, usePagination, useRowSelect, useColumnOrder,
	(hooks) => {
		hooks.visibleColumns.push((columns) => {
			return [
				{
					id: 'selection',
					// @ts-ignore
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<CheckboxRowSelect {...getToggleAllRowsSelectedProps()}/>
					),
					// @ts-ignore
					Cell: ({ row }) => (
						<CheckboxRowSelect {...row.getToggleRowSelectedProps()}/>
					)
				},
				...columns
			];
		});
	}
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// @ts-ignore
		page, nextPage, previousPage,
		// @ts-ignore
		canNextPage, canPreviousPage, pageOptions,
		// @ts-ignore
		gotoPage, pageCount, setPageSize,
		prepareRow,
		// @ts-ignore
		selectedFlatRows,
		state,
		// @ts-ignore
		setGlobalFilter,
		// @ts-ignore
		setColumnOrder,
	} = tableInstance;

	// @ts-ignore
	const { globalFilter, pageIndex, pageSize } = state;

	const changeOrder = () => {
		setColumnOrder([
			'id', 'userId', 'title', 'body'
		]);
	};

	return (
		<div className="container">
			<button onClick={changeOrder}>Поменять расположение столбцов</button>
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								// @ts-ignore
								<th {...column.getHeaderProps()}>
									<div>
										<div>
											{column.render('Header')}

											<span {
												// @ts-ignore
												...column.getHeaderProps(column.getSortByToggleProps())
											}>
												{
													// @ts-ignore
													column.isSorted ? (column.isSortedDesc ? <SortDescIcon /> : <SortAscIcon /> ) : <SortIcon />
												}
											</span>
										</div>
										<div>{
											// @ts-ignore
											column.canFilter ? column.render('Filter') : null
										}</div>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{
						// @ts-ignore
						page.map(row => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{
										// @ts-ignore
										row.cells.map(cell => {
											return (
												<td {...cell.getCellProps()} >
													{cell.render('Cell')}
												</td>
											);
										})}
								</tr>
							);
						})}
				</tbody>
			</table>
			<div className="pagination">
				<span>
                    Page: {'  '} <strong>{pageIndex + 1} of {pageOptions.length}</strong>{'  '}
				</span>
				<span>
                    | Go to page: {'  '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageNumber = e.target.value ? Number(e.target.value) - 1: 0;
							if (pageNumber < pageCount) {
								gotoPage(pageNumber);
							}
						}}
					/>
				</span>
				<select
					value={pageSize}
					// @ts-ignore
					onChange={(e) => setPageSize(Number(e.target.value))}>
					{
						[10, 25, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>{pageSize} строк</option>
						))
					}
				</select>

				<button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>First page</button>
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous page</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
				<button onClick={() => gotoPage(pageCount - 1)} disabled={pageIndex === (pageCount - 1)}>Last Page</button>
			</div>
			<pre>
				<code>
					{JSON.stringify({
						// @ts-ignore
						selectedFlatRows: selectedFlatRows.map((row) => row.original)
					}, null, 2)}
				</code>
			</pre>

		</div>
	);
};
