// import { selectProcOrderStatusAll } from 'entities/ProcOrderStatus';
import { ColumnDef } from '@tanstack/react-table';
// import { selectWarehousesAll } from 'entities/Warehouse';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
// import { useAppDispatch } from 'shared/lib/hooks/useAppdispatch';
import { Loader, TableHeaders, TableDataAlign, Table, TanstackTable } from 'shared/ui';
import { fuzzySort } from 'shared/ui/MyTanTable/MyTanTable.adds';
import { Person } from 'shared/ui/TanstackTable/makeData';
import { selectProcOrdersError, selectProcOrdersIsLoading } from '../model/procOrders.selectors';
// import { getProcOrders } from '../model/procOrders.services';
import { selectProcOrders } from '../model/procOrders.slice';
// import { selectUsersAll, selectUserById } from 'entities/Users';
import classes from './ProcOrdersTable.module.scss';
// import { ProcessedProcOrdersData } from '../model/procOrders.types';

interface ProcOrdersTableProps {
    className?: string;
}

export const ProcOrdersTable = memo((props: ProcOrdersTableProps) => {
	const { className } = props;
	// const dispatch = useAppDispatch();
	// const [processedData, setProcessedData] = useState<ProcessedProcOrdersData[]>();

	const isLoading = useSelector(selectProcOrdersIsLoading);
	const error = useSelector(selectProcOrdersError);
	const data = useSelector(selectProcOrders.selectAll);

	// const users = useSelector(selectUsersAll);
	// const warehouses = useSelector(selectWarehousesAll);
	// const statuses = useSelector(selectProcOrderStatusAll);

	// console.log(data);

	// useEffect(() => {
	// 	// получаем данные по заказам на закупку
	// 	dispatch(getProcOrders());
	// 	if (data.length) {
	// 		const procurementOrders = data.map((row) => {
	// 			const user = users.find((user) => user.id === row.userID);
	// 			const purchaser = users.find((user) => user.id === row.purchaserID);
	// 			const warehouse = warehouses.find(warehouse => warehouse.id === row.warehouseID);
	// 			const status = statuses.find(status => status.id === row.stateID);
	// 			return {
	// 				id: row.id,
	// 				user: `${user?.lastName} ${user?.firstName.charAt(0)}.`,
	// 				title: row.description,
	// 				project: row.project,
	// 				dateCreated: row.dateCreated,
	// 				dateNeed: row.dateNeed,
	// 				status: status?.title,
	// 				warehouse: warehouse?.title,
	// 				description: row.description,
	// 				purchaser: `${purchaser?.lastName} ${purchaser?.firstName.charAt(0)}.`,
	// 			};
	// 		});
	// 		setProcessedData(procurementOrders);
	// 	}
	// }, [dispatch, data, users, warehouses, statuses]);



	// const tableHeaders: TableHeaders[] = [
	// 	{ key: 'id', value: 'No', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
	// 	{ key: 'user', value: 'Инициатор', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'title', value: 'Описание', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'project', value: 'Проект', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'dateCreated', value: 'Дата заявки', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
	// 	{ key: 'dateNeed', value: 'Получить до', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
	// 	{ key: 'status', value: 'Статус', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'warehouse', value: 'Склад', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'description', value: 'Обоснование закупки', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
	// 	{ key: 'purchaser', value: 'В обработке у', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
	// ];

	const columns = React.useMemo<ColumnDef<Person, any>[]>(
		() => [
			{
				header: 'Name',
				footer: props => props.column.id,
				columns: [
					{
						accessorKey: 'firstName',
						cell: info => info.getValue(),
						footer: props => props.column.id,
					},
					{
						accessorFn: row => row.lastName,
						id: 'lastName',
						cell: info => info.getValue(),
						header: () => <span>Last Name</span>,
						footer: props => props.column.id,
					},
					{
						accessorFn: row => `${row.firstName} ${row.lastName}`,
						id: 'fullName',
						header: 'Full Name',
						cell: info => info.getValue(),
						footer: props => props.column.id,
						filterFn: 'fuzzy',
						sortingFn: fuzzySort,
					},
				],
			},
			{
				header: 'Info',
				footer: props => props.column.id,
				columns: [
					{
						accessorKey: 'age',
						header: () => 'Age',
						footer: props => props.column.id,
					},
					{
						header: 'More Info',
						columns: [
							{
								accessorKey: 'visits',
								header: () => <span>Visits</span>,
								footer: props => props.column.id,
							},
							{
								accessorKey: 'status',
								header: 'Status',
								footer: props => props.column.id,
							},
							{
								accessorKey: 'progress',
								header: 'Profile Progress',
								footer: props => props.column.id,
							},
						],
					},
				],
			},
		],
		[]
	);

	if (isLoading) {
		return (
			<div className={classNames(classes.ProcOrdersTable, {}, [className])}><Loader /></div>
		);
	}

	if (error) {
		return (
			<div className={classNames(classes.ProcOrdersTable, {}, [className])}>{error}</div>
		);
	}

	// if (!data.length) {
	// 	return (
	// 		<div className={classNames(classes.ProcOrdersTable, {}, [className])}>В таблице нет данных.</div>
	// 	);
	// }

	return (
		<div className={classNames(classes.ProcOrdersTable, {}, [className])}>
			{/*<Table headers={tableHeaders} data={processedData} />*/}
			<TanstackTable columns={columns} />
		</div>
	);
});
