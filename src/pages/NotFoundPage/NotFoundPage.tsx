import { classNames } from 'shared/lib/classNames/classNames';
import classes from './NotFoundPage.module.scss';
import { FC, memo } from 'react';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC = memo(({ className }: NotFoundPageProps) => {
	return (
		<div className={classNames(classes.NotFoundPage, {}, [className])}>
			<h3>Страница не найдена</h3>
		</div>
	);
});
