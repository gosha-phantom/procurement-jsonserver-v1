import { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ProcAuthLogin } from 'entities/ProcAuthLogin';
import { getProcOrders, getProcOrdersByUserID, ProcOrder } from 'entities/ProcOrders';
import { formatDate, useAppDispatch } from 'shared/lib';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader, Table } from 'shared/ui';
import { ProcOrdersTableButtons } from '../procOrdersTableButtons/procOrdersTableButtons';
import { ProcOrdersTableDetailButton } from '../procOrdersTableDetailButton/procOrdersTableDetailButton';

import classes from './ProcOrdersTable.module.scss';

interface ProcOrdersTableProps {
    className?: string;
    myOrders: boolean;
    disableEdit: boolean;
    disableDelete: boolean;
	data: ProcOrder[];
	authData?: ProcAuthLogin;
	isLoading?: boolean;
}

export const ProcOrdersTable = (props: ProcOrdersTableProps) => {
	const {
		className, myOrders, disableDelete, disableEdit,
		data, authData, isLoading= false
	} = props;
	const dispatch = useAppDispatch();

	useEffect(() => {
		!myOrders && dispatch(getProcOrders());
		myOrders && dispatch(getProcOrdersByUserID(authData?.ID));
	}, [dispatch, myOrders, authData?.ID]);

	const procOrdersTableColumns: ColumnDef<ProcOrder, unknown>[] = [
		{
			accessorKey: 'ID',
			header: '№ заявки',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
			enableColumnFilter: false
		},
		{
			accessorKey: 'user',
			header: 'Пользователь',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'title',
			header: 'Описание',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'project',
			header: 'Проект',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'dateCreated',
			header: 'Дата заявки',
			cell: cellProps => formatDate(new Date(cellProps.cell.getValue() as Date)),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'dateNeed',
			header: 'Закупить до',
			cell: cellProps => formatDate(new Date(cellProps.cell.getValue() as Date)),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'status',
			header: 'Статус',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'warehouse',
			header: 'Склад',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'description',
			header: 'Обоснование закупки',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'purchaser',
			header: 'В обработке у',
			cell: cellProps => cellProps.getValue(),
			footer: cellProps => cellProps.column.id,
		},
		{
			accessorKey: 'detailButton',
			header: '',
			cell: cellProps => <ProcOrdersTableDetailButton cellProps={cellProps}/>,
			footer: cellProps => cellProps.column.id,
			enableColumnFilter: false,
			enableSorting: false,
			enableGlobalFilter: false,
		}
	];

	if (authData && !disableEdit && !disableDelete) {
		console.log('render');
		procOrdersTableColumns.push({
			accessorKey: 'editButtons',
			header: '',
			cell: (props) => (
				<ProcOrdersTableButtons
					cellProps={props}
					disableEdit={disableEdit}
					disableDelete={disableDelete}
				/>
			),
			footer: props => props.column.id,
			enableColumnFilter: false,
			enableSorting: false,
			enableGlobalFilter: false,
		});
	}

	return (
		<section className={classNames(classes.ProcOrdersTable, {}, [className])}>
			{isLoading && (<Loader />)}
			{!isLoading && (
				<Table
					tableColumns={procOrdersTableColumns}
					tableData={data}
					debug={false}
					usePaginate={false}
				/>
			)}
		</section>
	);
};
