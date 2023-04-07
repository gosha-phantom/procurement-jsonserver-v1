import React, { InputHTMLAttributes, memo, useEffect } from 'react';
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

export enum InputTextAlignTypes {
    START = 'text-align-start',
    CENTER = 'text-align-center',
    END = 'text-align-end'
}

export enum InputBGColorTypes {
    NONE = 'bg-color-none',
    WHITE = 'bg-color-white',
    PRIMARY = 'bg-color-primary',
    INVERTED = 'bg-color-inverted'
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

export interface InputProps extends HTMLInputProps {
    className?: string;
    theme?: InputThemeTypes;
    size?: InputSizeTypes;
    value?: string | number;
    bg_color?: InputBGColorTypes;
    textAlign?: InputTextAlignTypes;
    onChange?:(value: any) => void;
    delay?: number;
}

export const Input = memo((props: InputProps) => {
	const {
		className, value: initialValue, onChange,
		type = 'text',
		theme = '',
		size = InputSizeTypes.MEDIUM,
		bg_color = InputBGColorTypes.NONE,
		textAlign = InputTextAlignTypes.START,
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
		[classes[bg_color]]: true,
		[classes[textAlign]]: true,
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
});
