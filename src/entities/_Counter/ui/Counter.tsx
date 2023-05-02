import { useSelector } from 'react-redux';
import { counterActions, useCounterActions } from '../model/slice/counterSlice';
import { getCounterValue, useCounterValue } from '../model/selectors/getCounterValue';
import { useCallback } from 'react';
import { Button, ButtonThemeTypes, HStack, VStack } from 'shared/ui';
import classes from './Counter.module.scss';
import { useAppDispatch } from 'shared/lib';

export const Counter = () => {
	// const dispatch = useAppDispatch();
	// const counterValue = useSelector(getCounterValue);
	const counterValue = useCounterValue();
	const { increment, decrement, add } = useCounterActions();

	const handleIncrement = () => {
		// dispatch(counterActions.increment());
		increment();
	};

	const handleDecrement = () => {
		// dispatch(counterActions.decrement());
		decrement();
	};

	const handleAdd = () => {
		// dispatch(counterActions.decrement());
		add(5);
	};

	return (
		<HStack gap={'16'} justify={'center'} align={'center'} className={classes.counter}>
			<h2>Counter Value = {counterValue}</h2>
			<VStack className={classes.buttons} gap={'8'} justify={'center'} align={'center'}>
				<Button className={classes.button} theme={ButtonThemeTypes.ROUNDED} onClick={handleIncrement}>Increment Counter</Button>
				<Button className={classes.button} theme={ButtonThemeTypes.ROUNDED} onClick={handleDecrement}>Decrement Counter</Button>
				<Button className={classes.button} theme={ButtonThemeTypes.ROUNDED} onClick={handleAdd}>Add 5</Button>
			</VStack>
		</HStack>
	);
};
