import { useMemo, useState } from 'react';
import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
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
import { Pagination } from '../Pagination/Pagination';
import { TableComponent } from '../TableComponent/TableComponent';
import { DebouncedInput, SimpleInputThemeTypes, HStack, VStack } from 'shared/ui';

import classes from './TSortAndFilterTable.module.scss';

declare module '@tanstack/table-core' {
    interface FilterFns { fuzzy: FilterFn<unknown> }
    interface FilterMeta { itemRank: RankingInfo }
}

interface TSortAndFilterTableProps<TData> {
    tableColumns:  ColumnDef<TData>[];
    tableData: TData[];
    debug?: boolean;
}

export const tableFuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

export const tableFuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
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
	const { tableColumns, tableData, debug = false } = props;

	const data = useMemo(() => [...tableData], [tableData]);
	const columns = useMemo(() => [...tableColumns], [tableColumns]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		data, columns,
		filterFns: { fuzzy: tableFuzzyFilter },
		state: { sorting, columnFilters, globalFilter },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: tableFuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: debug,
		debugHeaders: debug,
		debugColumns: debug,
		enableMultiSort: true,

	});

	// table.setPageSize(25);

	// console.log(table.options.state);

	// console.log('render');

	return (
		<HStack gap={'8'} maxWidth>
			<DebouncedInput
				className={classes.inputGlobalFilter}
				placeholder={'Поиск по всей таблице...'}
				value={globalFilter ?? ''}
				onChange={value => setGlobalFilter(String(value))}
				theme={SimpleInputThemeTypes.ROUNDED}
				delay={500}
			/>
			<Pagination table={table} />
			<VStack>Всего найдено записей: {table.getPrePaginationRowModel().rows.length}.</VStack>
			<TableComponent table={table} />
			{debug && (<pre><code>{JSON.stringify(table.getState(), null, 2)}</code></pre>)}
		</HStack>
	);
};
