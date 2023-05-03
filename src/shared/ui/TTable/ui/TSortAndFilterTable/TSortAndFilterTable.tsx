import { useEffect, useMemo, useState } from 'react';
import { RankingInfo } from '@tanstack/match-sorter-utils';
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
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import { Pagination } from '../Pagination/Pagination';
import { TableComponent } from '../TableComponent/TableComponent';
import { tableFuzzyFilter } from '../../model/ttable.services';
import { DebouncedInput, SimpleInputThemeEnum, HStack, VStack } from 'shared/ui';

import classes from './TSortAndFilterTable.module.scss';

declare module '@tanstack/table-core' {
    interface FilterFns { fuzzy: FilterFn<unknown> }
    interface FilterMeta { itemRank: RankingInfo }
}

interface TSortAndFilterTableProps<TData> {
    tableColumns:  ColumnDef<TData>[];
    tableData: TData[];
    debug?: boolean;
    usePaginate?: boolean;
    initialPageSize?: number;
    selectPageSizes?: number[];
}

export const TSortAndFilterTable = (props: TSortAndFilterTableProps<any>) => {
	const {
		tableColumns, tableData,
		initialPageSize = 10, selectPageSizes = [10, 20, 30, 40, 50],
		debug = false, usePaginate = true,
	} = props;

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
	});

	// если нужно задать изначально количество строк по умолчанию
	useEffect(() => {
		if (usePaginate) {
			table.setPageSize(initialPageSize);
		} else {
			table.setPageSize(1000000);
		}
	// eslint-disable-next-line
	}, [table.setPageSize]);

	return (
		<HStack gap={'8'} maxWidth>
			<DebouncedInput
				className={classes.inputGlobalFilter}
				placeholder={'Поиск по всей таблице...'}
				value={globalFilter ?? ''}
				onChange={value => setGlobalFilter(String(value))}
				theme={SimpleInputThemeEnum.ROUNDED}
				delay={500}
			/>
			{usePaginate && <Pagination table={table} selectPageSizes={selectPageSizes} />}
			<VStack>Всего найдено записей: {table.getPrePaginationRowModel().rows.length}.</VStack>
			<TableComponent table={table} />
			{debug && (<pre><code>{JSON.stringify(table.getState(), null, 2)}</code></pre>)}
		</HStack>
	);
};
