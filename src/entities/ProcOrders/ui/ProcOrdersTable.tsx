import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppdispatch';
import { Loader, TableHeaders, TableDataAlign, Table } from 'shared/ui';
import { selectProcOrdersError, selectProcOrdersIsLoading } from '../model/procOrders.selectors';
import { getProcOrders } from '../model/procOrders.services';
import { selectProcOrders } from '../model/procOrders.slice';
import { selectUsers } from 'entities/Users';
import classes from './ProcOrdersTable.module.scss';

interface ProcOrdersTableProps {
    className?: string;
}

export const ProcOrdersTable = memo((props: ProcOrdersTableProps) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const [processedData, setProcessedData] = useState();

	const isLoading = useSelector(selectProcOrdersIsLoading);
	const error = useSelector(selectProcOrdersError);
	const data = useSelector(selectProcOrders.selectAll);

	const users = useSelector(selectUsers.selectAll);

	useEffect(() => {
		// получаем данные по заказам на закупку
		dispatch(getProcOrders());
		if (data.length) {
			const procurementOrders = data.map((row) => {
				const user = users.find((user) => user.id === row.userID);
				return {
					id: row.id,
					user: `${user?.lastName} ${user?.firstName.charAt(0)}.`,
					title: row.description,

				};
			});
		}
	}, [dispatch, data, users]);

	const tableHeaders: TableHeaders[] = [
		{ key: 'id', value: 'No', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'userID', value: 'Инициатор', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'title', value: 'Описание', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'project', value: 'Проект', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'dateCreated', value: 'Дата заявки', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'dateNeed', value: 'Получить до', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
		{ key: 'stateID', value: 'Описание', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'warehouseID', value: 'Склад', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'description', value: 'Обоснование закупки', filter: true, sort: true, textAlign: TableDataAlign.LEFT },
		{ key: 'purchaserID', value: 'В обработке у', filter: true, sort: true, textAlign: TableDataAlign.CENTER },
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
			<Table headers={tableHeaders} data={data} />
		</div>
	);
});
