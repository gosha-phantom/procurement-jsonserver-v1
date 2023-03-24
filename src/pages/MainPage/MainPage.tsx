import { memo } from 'react';
import { Counter } from 'entities/_Counter';
import classes from './MainPage.module.scss';

const MainPage = () => {

	return (
		<div className={classes.MainPage}>
			<Counter />
		</div>
	);
};

export default memo(MainPage);
