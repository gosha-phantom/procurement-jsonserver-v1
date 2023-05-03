import { useRef, useState } from 'react';
import { SimpleInputWidthEnum } from 'shared/ui';
import { formatDate, addDaysToDate } from 'shared/lib';
import { InputBlock } from './InputBlock/InputBlock';

const formatType = 'yyyy-MM-dd';

export const BuyTillInputBlock = () => {
	const currentValue = useRef<string>(formatDate(addDaysToDate(new Date(), 5), { formatType }));
	const minDate = useRef<string>(formatDate(addDaysToDate(new Date(), 1), { formatType }));
	const maxDate = useRef<string>(formatDate(addDaysToDate(new Date(), 45), { formatType }));

	return (
		<InputBlock
			label={'Закупить до'}
			inputValue={currentValue.current}
			inputWidth={SimpleInputWidthEnum.QUARTER_WIDTH}
			type={'date'}
			min={minDate.current}
			max={maxDate.current}
		/>
	);
};
