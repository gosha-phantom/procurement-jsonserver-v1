import { useSelector } from 'react-redux';
import { counterActions, getCounterValue } from 'entities/_Counter';
import { useCallback } from 'react';
import { Button, ButtonThemeTypes, HStack, VStack } from 'shared/ui';
import classes from './Counter.module.scss';
import { useAppDispatch } from 'shared/lib';

export const Counter = () => {
	const dispatch = useAppDispatch();
	const counterValue = useSelector(getCounterValue);

	const increment = useCallback(() => {
		dispatch(counterActions.increment());
	}, [dispatch]);

	const decrement = useCallback(() => {
		dispatch(counterActions.decrement());
	}, [dispatch]);

	return (
		<HStack gap={'16'} justify={'center'} align={'center'} className={classes.counter}>
			<h2>Counter Value = {counterValue}</h2>
			<VStack className={classes.buttons} gap={'8'} justify={'center'} align={'center'}>
				<Button className={classes.button} theme={ButtonThemeTypes.ROUNDED} onClick={increment}>Increment Counter</Button>
				<Button className={classes.button} theme={ButtonThemeTypes.ROUNDED} onClick={decrement}>Decrement Counter</Button>
			</VStack>
		</HStack>
	);
};
