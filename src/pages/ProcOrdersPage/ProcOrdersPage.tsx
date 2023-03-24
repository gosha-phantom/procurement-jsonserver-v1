import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ProcOrdersPage.module.scss';

interface ProcOrdersPageProps {
    className?: string;
}

const ProcOrdersPage = (props: ProcOrdersPageProps) => {
	const { className } = props;

	return (
		<div className={classNames(classes.ProcOrdersPage, {}, [className])}>
            ProcOrdersPage
		</div>
	);
};

export default memo(ProcOrdersPage);
