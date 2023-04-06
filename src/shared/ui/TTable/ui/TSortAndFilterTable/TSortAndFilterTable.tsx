import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingFn,
	sortingFns,
	SortingState,
	TableOptions,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Input, InputThemeTypes } from 'shared/ui';
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
	const {
		tableColumns, tableData,
	} = props;
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable<TableOptions<any[]>>({
		// @ts-ignore
		data: tableData, columns: tableColumns,
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
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});


	return (
		<HStack gap={'16'}>
			<Input
				className={classes.inputGlobalFilter}
				placeholder={'Поиск по всей таблице...'}
				value={globalFilter ?? ''}
				onChange={value => setGlobalFilter(String(value))}
				theme={InputThemeTypes.ROUNDED}
				delay={500}
			/>
			<table className={classes.table}>
				<thead className={classes.thead}>
					{table.getHeaderGroups().map(headerGroup => (
						<tr className={classes.tr} key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th className={`${classes.th} ${header.column.getCanSort() ? 'cursor-pointer' : ''}`} key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<HStack align={'center'}>
												<div className={classes.sort} {...{ onClick: header.column.getToggleSortingHandler() }}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: <SortAscIcon />,
														desc: <SortDescIcon />,
													}[header.column.getIsSorted() as string] ?? <SortIcon />}
												</div>
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
			<VStack>Всего найдено записей: {table.getRowModel().rows.length}.</VStack>
			<pre>{JSON.stringify(sorting, null, 2)}</pre>
		</HStack>

	);
};
