import { useDispatch, useSelector } from 'react-redux';
import { counterActions, getCounterValue } from 'entities/_Counter';
import { useCallback } from 'react';
import classes from './Counter.module.scss';

export const Counter = () => {
	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);

	const increment = useCallback(() => {
		dispatch(counterActions.increment());
	}, [dispatch]);

	const decrement = useCallback(() => {
		dispatch(counterActions.decrement());
	}, [dispatch]);

	return (
		<div className={classes.counter}>
			<h2>Counter Value = {counterValue}</h2>
			<div className={classes.buttons}>
				<button type={'button'} onClick={increment}>Increment Counter</button>
				<button type={'button'} onClick={decrement}>Decrement Counter</button>
			</div>
		</div>
	);
};
