import { selectProcOrderStatusAll } from 'entities/ProcOrderStatus';
import { selectWarehousesAll } from 'entities/Warehouse';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppdispatch';
import { Loader, TableHeaders, TableDataAlign, Table } from 'shared/ui';
import { selectProcOrdersError, selectProcOrdersIsLoading } from '../model/procOrders.selectors';
import { getProcOrders } from '../model/procOrders.services';
import { selectProcOrders } from '../model/procOrders.slice';
import { selectUsersAll, selectUserById } from 'entities/Users';
import classes from './ProcOrdersTable.module.scss';

interface ProcOrdersTableProps {
    className?: string;
}

interface ProcessedProcOrdersData {
    id?: number;
    user?: string;
    title?: string;
    project?: string;
    dateCreated?: string;
    dateNeed?: string;
    status?: string;
    warehouse?: string;
    description?: string;
    purchaser?: string;
}

export const ProcOrdersTable = memo((props: ProcOrdersTableProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const [processedData, setProcessedData] = useState<ProcessedProcOrdersData>();

	const isLoading = useSelector(selectProcOrdersIsLoading);
	const error = useSelector(selectProcOrdersError);
	const data = useSelector(selectProcOrders.selectAll);

	const users = useSelector(selectUsersAll);
	const warehouses = useSelector(selectWarehousesAll);
	const statuses = useSelector(selectProcOrderStatusAll);

	console.log(data);

	useEffect(() => {
		// получаем данные по заказам на закупку
		dispatch(getProcOrders());
		if (data.length) {
			const procurementOrders = data.map((row) => {
				const user = users.find((user) => user.id === row.userID);
				const purchaser = users.find((user) => user.id === row.purchaserID);
				const warehouse = warehouses.find(warehouse => warehouse.id === row.warehouseID);
				const status = statuses.find(status => status.id === row.stateID);
				return {
					id: row.id,
					user: `${user?.lastName} ${user?.firstName.charAt(0)}.`,
					title: row.description,
					project: row.project,
					dateCreated: row.dateCreated,
					dateNeed: row.dateNeed,
					status: status?.title,
					warehouse: warehouse?.title,
					description: row.description,
					purchaser: `${purchaser?.lastName} ${purchaser?.firstName.charAt(0)}.`,
				};
			});
			// @ts-ignore
			setProcessedData(procurementOrders);
		}
	}, [dispatch, data, users, warehouses, statuses]);



	const tableHeaders: TableHeaders[] = [
		{ key: 'id', value: 'No', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'user', value: 'Инициатор', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'title', value: 'Описание', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'project', value: 'Проект', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'dateCreated', value: 'Дата заявки', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'dateNeed', value: 'Получить до', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'status', value: 'Статус', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'warehouse', value: 'Склад', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'description', value: 'Обоснование закупки', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'purchaser', value: 'В обработке у', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
	];

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

	if (!data.length) {
		return (
			<div className={classNames(classes.ProcOrdersTable, {}, [className])}>В таблице нет данных.</div>
		);
	}

	return (
		<div className={classNames(classes.ProcOrdersTable, {}, [className])}>
			<Table headers={tableHeaders} data={processedData} />
		</div>
	);
});
