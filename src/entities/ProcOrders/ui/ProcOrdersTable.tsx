import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ProcOrdersTable.module.scss';

interface ProcOrdersTableProps {
    className?: string;
}

export const ProcOrdersTable = memo((props: ProcOrdersTableProps) => {
	const { className } = props;

	return (
		<div className={classNames(classes.ProcOrdersTable, {}, [className])}>
            Здесь будет таблица заказов...
		</div>
	);
});
