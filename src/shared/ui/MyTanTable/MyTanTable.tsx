import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './MyTanTable.module.scss';

interface MyTanTableProps {
    className?: string;
}

export const MyTanTable = memo((props: MyTanTableProps) => {
	const { className } = props;

	return (
		<div className={classNames(classes.MyTanTable, {}, [className])}>
            MyTanTable
		</div>
	);
});
