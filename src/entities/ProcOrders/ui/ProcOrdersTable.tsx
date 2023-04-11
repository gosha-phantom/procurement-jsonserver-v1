import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getProcOrders, getProcOrdersByUserID } from 'entities/ProcOrders';
import { useAppDispatch } from 'shared/lib';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader, Table } from 'shared/ui';
import { selectProcOrdersAll, selectProcOrdersError, selectProcOrdersIsLoading, } from '../model/procOrders.selectors';
import { ProcOrder } from '../model/procOrders.types';

import classes from './ProcOrdersTable.module.scss';

interface ProcOrdersTableProps {
    className?: string;
    myOrders?: boolean;
}

const formatDate = (dt: string) => {
	const formattedDate = format(parseISO(dt), 'eeeeee yyyy-MM-dd', { locale: ru });
	return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1,);
};

export const ProcOrdersTable = (props: ProcOrdersTableProps) => {
	const { className, myOrders = false } = props;
	const dispatch = useAppDispatch();
	const error = useSelector(selectProcOrdersError);
	const isLoading = useSelector(selectProcOrdersIsLoading);
	const data = useSelector(selectProcOrdersAll);

	useEffect(() => {
		!myOrders && dispatch(getProcOrders());
		myOrders && dispatch(getProcOrdersByUserID());
	}, [dispatch, myOrders]);

	const tableColumns: ColumnDef<ProcOrder, unknown>[]  = [
		{
			accessorKey: 'ID',
			header: '№ заявки',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'user',
			header: 'Пользователь',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'title',
			header: 'Описание',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'project',
			header: 'Проект',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'dateCreated',
			header: 'Дата заявки',
			cell: props => formatDate(props.cell.getValue() as string),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'dateNeed',
			header: 'Закупить до',
			cell: props => formatDate(props.cell.getValue() as string),
			footer: props => props.column.id,

		},
		{
			accessorKey: 'status',
			header: 'Статус',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'warehouse',
			header: 'Склад',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'description',
			header: 'Обоснование закупки',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
		{
			accessorKey: 'purchaser',
			header: 'В обработке у',
			cell: props => props.getValue(),
			footer: props => props.column.id,
		},
	];

	return (
		<section className={classNames(classes.ProcOrdersTable, {}, [className])}>
			{isLoading && <Loader />}
			{!isLoading && error && (<p>{error}</p>)}
			{!isLoading && !error && data && (
				<Table tableColumns={tableColumns} tableData={data} debug={false} usePaginate={false}/>
			)}
		</section>
	);
};
