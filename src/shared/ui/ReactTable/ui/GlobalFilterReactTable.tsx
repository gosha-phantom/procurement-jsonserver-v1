import { useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

import { ReactComponent as SortIcon } from 'shared/assets/icons/sort-sortable.svg';
import { ReactComponent as SortAscIcon } from 'shared/assets/icons/sort-asc-sortable.svg';
import { ReactComponent as SortDescIcon } from 'shared/assets/icons/sort-desc-sortable.svg';
import { GlobalFilter } from 'shared/ui/ReactTable/ui/GlobalFilter/GlobalFilter';

import { getUsersFromFakeAPI } from '../model/ReactTable.services';
import { PostsFromFakeAPI } from '../model/ReactTable.types';
import { ReactTableColumnsExample } from '../model/ReactTable.columns';

import '../styles/ReactTable.module.scss';


export const GlobalFilterReactTable = () => {
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
	}, useGlobalFilter, useSortBy);


	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		state,
		// @ts-ignore
		setGlobalFilter,
	} = tableInstance;

	// @ts-ignore
	const { globalFilter } = state;

	// @ts-ignore
	return (
		<div className="container">
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								// @ts-ignore
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									<div>
										{column.render('Header')}
										<span>
											{
												// @ts-ignore
												column.isSorted ? (column.isSortedDesc ? <SortDescIcon /> : <SortAscIcon /> ) : <SortIcon />
											}
										</span>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
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
				<tfoot>
					{footerGroups.map(footerGroup => (
						<tr {...footerGroup.getFooterGroupProps()}>
							{footerGroup.headers.map(column => (
								<td {...column.getFooterProps()}>
									{column.render('Footer')}
								</td>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	);
};
