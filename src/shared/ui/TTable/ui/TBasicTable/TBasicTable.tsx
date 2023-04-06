import { ColumnDef, flexRender, getCoreRowModel, TableOptions, useReactTable, } from '@tanstack/react-table';
import { TData } from '../../model/ttable.types';
import classes from '../../styles/TTable.module.scss';

interface TBasicTableProps<TData> {
    tableColumns:  ColumnDef<TData>[];
    tableData: TData[];
}

export const TBasicTable = (props: TBasicTableProps<TData>) => {
	const { tableColumns, tableData } = props;

	const table = useReactTable<TableOptions<TData>>({
		// @ts-ignore
		data: tableData, columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<table className={classes.table}>
			<thead className={classes.thead}>
				{table.getHeaderGroups().map(headerGroup => (
					<tr className={classes.tr} key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th className={classes.th} key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)
								}
							</th>
						))}
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
	);
};
