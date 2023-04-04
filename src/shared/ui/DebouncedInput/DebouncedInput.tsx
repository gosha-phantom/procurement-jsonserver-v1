import React, { memo } from 'react';

interface DebounceInputProps {
    value: string | number;
    onChange: (value: string | number) => void
    delay?: number
}

type DebounceInputType = DebounceInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

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
			onChange(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay, onChange]);

	return (
		<input {...otherProps} value={value} onChange={e => setValue(e.target.value)}/>
	);
});
