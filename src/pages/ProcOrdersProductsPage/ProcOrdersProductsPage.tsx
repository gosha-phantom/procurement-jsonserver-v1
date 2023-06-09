import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ProcOrdersProductsPage.module.scss';

interface ProcOrdersProductsPageProps {
    className?: string;
}

const ProcOrdersProductsPage = (props: ProcOrdersProductsPageProps) => {
	const { className } = props;

	return (
		<div className={classNames(classes.ProcOrdersProductsPage, {}, [className])}>
            Здесь будет таблица детализации заказов...
		</div>
	);
};

export default memo(ProcOrdersProductsPage);
