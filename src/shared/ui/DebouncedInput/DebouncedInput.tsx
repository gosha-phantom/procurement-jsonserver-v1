import React, { ChangeEvent, ComponentType, forwardRef, memo, Ref } from 'react';
import { SimpleInput, SimpleInputProps, SimpleInputElements } from '../Input/SimpleInput';

interface DebounceInputProps {
    value: string | number;
    onChange?: (value: string | number) => void;
    delay?: number;
}

// type DebounceInputType = DebounceInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
type DebounceInputType = DebounceInputProps & Omit<SimpleInputProps<any>, 'onChange'>

export const DebouncedInput = memo((props: DebounceInputType) => {
	const {
		value: initialValue, onChange, delay = 500,
		...otherProps
	} = props;
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange?.(value);
		}, delay);

		return () => clearTimeout(timeout);
		// НЕЛЬЗЯ добавлять onChange в зависимости,  иначе будет РЕРЕНДЕР ТАБЛИЦЫ!!
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, delay]);

	return (
		<SimpleInput {...otherProps} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}/>
	);
});
