import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
	<div className={classNames(classes.loaderWrapper, {}, [className])}>
        Загрузка данных...
		<div className={classes.loader}></div>
	</div>
);