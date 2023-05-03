import { useRef, useState } from 'react';
import { SimpleInputWidthTypes } from 'shared/ui';
import { formatDate, addDaysToDate } from 'shared/lib';
import { InputBlock } from './InputBlock/InputBlock';

export const BuyTillInputBlock = () => {
	const currentValue = useRef(addDaysToDate(new Date(), 5));
	// const minDate = useRef<string>(formatDate(
	// 	addDaysToDate(new Date(), 1).toLocaleDateString(),
	// 	{ formatType: 'yyyy-MM-dd' })
	// );
	// const onChangeHandler = () => {
	// 	console.log();};

	console.log (new Date());

	return (
		<InputBlock
			label={'Закупить до'}
			inputValue={1}
			inputWidth={SimpleInputWidthTypes.QUARTER_WIDTH}
			type={'date'}
			// onChange={onChangeHandler}
			// min={minDate.current}
		/>
	);
};
