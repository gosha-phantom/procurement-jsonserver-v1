import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingFn,
	sortingFns,
	SortingState,
	TableOptions,
	useReactTable,
} from '@tanstack/react-table';
import { ChangeEvent, useMemo, useState } from 'react';
import {
	Button,
	ButtonThemeTypes,
	DebouncedInput,
	SimpleInput,
	SimpleInputTextAlignTypes,
	SimpleInputThemeTypes
} from 'shared/ui';
import { ColumnFilterField } from '../ColumnFilterField/ColumnFilterField';
import { ReactComponent as SortAscIcon } from '../../../../assets/icons/sort-asc-sortable.svg';
import { ReactComponent as SortDescIcon } from '../../../../assets/icons/sort-desc-sortable.svg';
import { ReactComponent as SortIcon } from '../../../../assets/icons/sort-sortable.svg';
import { HStack, VStack } from '../../../Stack';

import classes from '../../styles/TTable.module.scss';

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

interface TSortAndFilterTableProps<TData> {
    tableColumns:  ColumnDef<TData>[];
    tableData: TData[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	let dir = 0;

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]?.itemRank,
			rowB.columnFiltersMeta[columnId]?.itemRank
		);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const TSortAndFilterTable = (props: TSortAndFilterTableProps<any>) => {
	const { tableColumns, tableData } = props;

	const data = useMemo(() => [...tableData], [tableData]);
	const columns = useMemo(() => [...tableColumns], [tableColumns]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable<TableOptions<any[]>>({
		// @ts-ignore
		data, columns,
		filterFns: { fuzzy: fuzzyFilter },
		state: { sorting, columnFilters, globalFilter },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});


	return (
		<HStack gap={'8'}>
			<DebouncedInput
				className={classes.inputGlobalFilter}
				placeholder={'Поиск по всей таблице...'}
				value={globalFilter ?? ''}
				onChange={value => setGlobalFilter(String(value))}
				theme={SimpleInputThemeTypes.ROUNDED}
				delay={500}
			/>

			<table className={classes.table}>
				<thead className={classes.thead}>
					{table.getHeaderGroups().map(headerGroup => (
						<tr className={classes.tr} key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th className={classes.th} key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<HStack align={'center'}>
												<div
													className={`${classes.sort} ${header.column.getCanSort() ? classes['cursor-pointer'] : ''}`}
													{...{ onClick: header.column.getToggleSortingHandler() }}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: <SortAscIcon />,
														desc: <SortDescIcon />,
													}[header.column.getIsSorted() as string] ??
                                                        header.column.getCanSort()
														? <SortIcon />
														: null
													}
												</div>
												{
													header.column.getCanFilter()
														? (
															<div>
																<ColumnFilterField column={header.column} table={table}/>
																{/*<Filter column={header.column} table={table}/>*/}
															</div>
														)
														: null
												}
											</HStack>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody className={classes.tbody}>
					{table.getRowModel().rows.map(row => (
						<tr className={classes.tr} key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td className={classes.td} key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot className={classes.tfoot}>
					{table.getFooterGroups().map(footerGroup => (
						<tr className={classes.tr} key={footerGroup.id}>
							{footerGroup.headers.map(footerHeader => (
								<th key={footerHeader.id} className={classes.th}>
									{footerHeader.isPlaceholder
										? null
										: flexRender(
											footerHeader.column.columnDef.header,
											footerHeader.getContext()
										)
									}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
			<VStack>Всего найдено записей: {table.getPrePaginationRowModel().rows.length}.</VStack>
			<VStack gap={'8'} align={'center'}>
				<Button
					theme={ButtonThemeTypes.ROUNDED}
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>{'<<'}</Button>
				<Button
					theme={ButtonThemeTypes.ROUNDED}
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>{'<'}</Button>
				<Button
					theme={ButtonThemeTypes.ROUNDED}
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>{'>'}</Button>
				<Button
					theme={ButtonThemeTypes.ROUNDED}
					onClick={() => table.setPageIndex(table.getPageCount()-1)}
					disabled={!table.getCanNextPage()}
				>{'>>'}</Button>
                Страница <strong>{table.getState().pagination.pageIndex + 1}</strong> из <strong>{table.getPageCount()}</strong>
				| Перейти к странице
				<SimpleInput
					className={classes['w-5-rem']}
					type="number"
					theme={SimpleInputThemeTypes.ROUNDED}
					textAlign={SimpleInputTextAlignTypes.CENTER}
					defaultValue={table.getState().pagination.pageIndex + 1}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0;
						console.log(e);
						table.setPageIndex(page);
					}}
				/>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40,50].map(pageSize => (
						<option value={pageSize} key={pageSize}>Показать {pageSize} записей.</option>
					))}
				</select>
			</VStack>
			{/*<pre>{JSON.stringify(table.getState(), null, 2)}</pre>*/}
		</HStack>
	);
};


