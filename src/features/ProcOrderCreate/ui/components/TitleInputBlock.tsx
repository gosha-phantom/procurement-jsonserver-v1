import { useState } from 'react';
import { SimpleInputWidthTypes } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

export const TitleInputBlock = () => {
	const [value, setValue] = useState<string | number>('');

	return (
		<InputBlock
			label={'Описание'}
			inputValue={value}
			onChange={(e) => setValue(e)}
			delay={500}
			inputWidth={SimpleInputWidthTypes.HALF_WIDTH}
		/>
	);
};
