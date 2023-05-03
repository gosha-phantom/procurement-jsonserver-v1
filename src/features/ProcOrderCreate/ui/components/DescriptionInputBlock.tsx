import { useState } from 'react';
import { SimpleInputWidthEnum } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

export const DescriptionInputBlock = () => {
	const [value, setValue] = useState<string | number>('');

	return (
		<InputBlock
			label={'Обоснование закупки'}
			inputValue={value}
			onChange={(e) => setValue(e)}
			delay={500}
			inputWidth={SimpleInputWidthEnum.HALF_WIDTH}
			as={'textarea'}
			rows={3}
		/>
	);
};
