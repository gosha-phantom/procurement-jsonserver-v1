import { useRef } from 'react';
import { SimpleInputWidthEnum } from 'shared/ui';
import { formatDate } from 'shared/lib';
import { InputBlock } from './InputBlock/InputBlock';

export const OrderCreatedInputBlock = () => {
	const value = useRef<string>(formatDate(new Date(), { formatType: 'yyyy-MM-dd' }));

	return (
		<InputBlock
			label={'Заявка создана'}
			inputValue={value.current}
			inputWidth={SimpleInputWidthEnum.QUARTER_WIDTH}
			disabled={true}
		/>
	);
};
