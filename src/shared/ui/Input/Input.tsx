import React, { InputHTMLAttributes, useEffect } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

export enum InputSizeTypes {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

export enum InputThemeTypes {
    CLEAR = 'theme-clear',
    RED = 'theme-red',
    NORMAL = 'theme-normal',
    UNDERLINED = 'theme-underlined',
    ROUNDED = 'theme-rounded',
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

export interface InputProps extends HTMLInputProps {
    className?: string;
    theme?: InputThemeTypes;
    size?: InputSizeTypes;
    value?: string | number;
    onChange?:(value: any) => void;
    delay?: number;
}

export const Input = (props: InputProps) => {
	const {
		className, value: initialValue, onChange,
		type = 'text',
		theme = '',
		size = InputSizeTypes.MEDIUM,
		delay = 0,
		...otherProps
	} = props;

	const [value, setValue] = React.useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange?.(value);}, delay);
		return () => clearTimeout(timeout);
	}, [value, delay, onChange]);

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[size]]: true,
	};

	return (
		<input
			className={classNames(classes.Input, mods, [className])}
			type={type}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			{...otherProps}
		/>
	);
};
