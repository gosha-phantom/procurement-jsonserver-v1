import { forwardRef, ForwardRefExoticComponent, MutableRefObject, Ref, RefObject, useImperativeHandle, useState } from 'react';
import { SimpleInputWidthEnum } from 'shared/ui';
import { InputBlock } from './InputBlock/InputBlock';

export const TitleInputBlock = forwardRef((ref: Ref<string | number>) => {
	const [value, setValue] = useState<string | number>('');

	useImperativeHandle(ref, () => {
		return value;
	}, [value]);

	return (
		<InputBlock
			label={'Описание'}
			inputValue={value}
			onChange={(e) => setValue(e)}
			delay={500}
			inputWidth={SimpleInputWidthEnum.HALF_WIDTH}
		/>
	);
});
