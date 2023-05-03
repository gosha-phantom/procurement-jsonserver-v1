import { useRef } from 'react';
import { SimpleInputWidthTypes } from 'shared/ui';
import { formatDate } from 'shared/lib';
import { InputBlock } from './InputBlock/InputBlock';

export const OrderCreatedInputBlock = () => {
	const value = useRef<string>(new Date().toISOString());

	return (
		<InputBlock
			label={'Заявка создана'}
			inputValue={formatDate(value.current, {})}
			inputWidth={SimpleInputWidthTypes.QUARTER_WIDTH}
			disabled={true}
		/>
	);
};
