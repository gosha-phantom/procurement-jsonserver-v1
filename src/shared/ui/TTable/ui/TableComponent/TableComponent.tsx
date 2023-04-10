import { flexRender, Table } from '@tanstack/react-table';
import { ReactComponent as SortAscIcon } from 'shared/assets/icons/sort-asc-sortable.svg';
import { ReactComponent as SortDescIcon } from 'shared/assets/icons/sort-desc-sortable.svg';
import { ReactComponent as SortIcon } from 'shared/assets/icons/sort-sortable.svg';
import { HStack } from 'shared/ui';
import { ColumnFilterField } from 'shared/ui/TTable/ui/ColumnFilterField/ColumnFilterField';
import classes from './TableComponent.module.scss';

interface TableComponentProps {
    table: Table<any>;
}

export const TableComponent = (props: TableComponentProps) => {
	const { table } = props;

	return (
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
														<ColumnFilterField key={header.id} column={header.column} table={table}/>
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
	);
};
