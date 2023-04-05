import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import { getUsersFromFakeAPI } from '../model/ReactTable.services';
import { PostsFromFakeAPI } from '../model/ReactTable.types';
import { ReactTableColumnsExample } from '../model/ReactTable.columns';

import '../styles/ReactTable.module.scss';


export const BasicReactTable = () => {
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
	});

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
	} = tableInstance;

	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>
								{column.render('Header')}
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
	);
};
