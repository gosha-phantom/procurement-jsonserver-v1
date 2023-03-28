import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ProcOrdersTable } from 'entities/ProcOrders';
import { Text, TextSize } from 'shared/ui';
import classes from './ProcOrdersPage.module.scss';

interface ProcOrdersPageProps {
    className?: string;
}

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;

	return (
		<div className={classNames(classes.ProcOrdersPage, {}, [className])}>
			<Text size={TextSize.LARGE}>Таблица заказов на закупку</Text>
			<ProcOrdersTable />
		</div>
	);
};

export default memo(ProcOrdersPage);
