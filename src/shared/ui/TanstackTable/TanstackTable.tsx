import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { DebouncedInput } from 'shared/ui';

import { Filter } from 'shared/ui/MyTanTable/MyTanTable.filter';
import { fuzzyFilter } from 'shared/ui/MyTanTable/MyTanTable.adds';
import { makeData, Person } from './makeData';
import './TanstackTable.module.scss';


export interface TanstackTableProps<T> {
    columns: ColumnDef<T, any>[]
}

export const TanstackTable = (props: TanstackTableProps<any>) => {

	const { columns } = props;
	// const rerender = React.useReducer(() => ({}), {})[1];

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = React.useState('');
	const [data, setData] = React.useState<Person[]>(() => makeData(50000));
	// const refreshData = () => setData(old => makeData(50000));

	const table = useReactTable({
		data,
		columns,
		filterFns: { fuzzy: fuzzyFilter, },
		state: { columnFilters, globalFilter, },
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	React.useEffect(() => {
		if (table.getState().columnFilters[0]?.id === 'fullName') {
			if (table.getState().sorting[0]?.id !== 'fullName') {
				table.setSorting([{ id: 'fullName', desc: false }]);
			}
		}
	}, [table]);

	return (
		<div className="p-2">
			<div>
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={value => setGlobalFilter(String(value))}
					className="p-2 font-lg shadow border border-block"
					placeholder="Search all columns..."
				/>
			</div>
			<div className="h-2" />
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
												{header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} table={table} />
													</div>
												) : null}
											</>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{/*<div className="h-2" />*/}

			{/*пагинация по таблице!!!*/}
			<div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className="flex items-center gap-1">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</strong>
				</span>
				<span className="flex items-center gap-1">
			| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
                            Show {pageSize}
						</option>
					))}
				</select>
			</div>

			{/*<div>{table.getPrePaginationRowModel().rows.length} Rows</div>*/}
			{/*<div>*/}
			{/*	<button onClick={() => rerender()}>Force Rerender</button>*/}
			{/*</div>*/}
			{/*<div>*/}
			{/*	<button onClick={() => refreshData()}>Refresh Data</button>*/}
			{/*</div>*/}
			{/*<pre>{JSON.stringify(table.getState(), null, 2)}</pre>*/}
		</div>
	);
};


