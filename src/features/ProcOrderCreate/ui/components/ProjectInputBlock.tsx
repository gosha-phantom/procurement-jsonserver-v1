import { useState } from 'react';
import { SimpleInputWidthTypes } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

export const ProjectInputBlock = () => {
	const [value, setValue] = useState<string | number>('');

	return (
		<InputBlock
			label={'Проект'}
			inputValue={value}
			onChange={(e) => setValue(e)}
			delay={500}
			inputWidth={SimpleInputWidthTypes.QUARTER_WIDTH}
		/>
	);
};
