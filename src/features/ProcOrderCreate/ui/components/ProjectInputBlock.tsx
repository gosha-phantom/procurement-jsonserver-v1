import { useState } from 'react';
import { SimpleInputWidthEnum } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

export const ProjectInputBlock = () => {
	const [value, setValue] = useState<string | number>('');

	return (
		<InputBlock
			label={'Проект'}
			inputValue={value}
			onChange={(e) => setValue(e)}
			delay={500}
			inputWidth={SimpleInputWidthEnum.QUARTER_WIDTH}
		/>
	);
};
