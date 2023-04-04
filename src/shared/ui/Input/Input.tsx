import React, { memo, ReactHTMLElement } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { InputSize, InputTheme } from './Input.types';
import classes from './Input.module.scss';

interface InputProps extends ReactHTMLElement<HTMLInputElement>{
    className?: string;
    theme?: InputTheme;
    size?: InputSize;
    value?: string | number;
    placeholder?: string;
    onChange?:(value: any) => void;
}

export const Input = memo((props: InputProps) => {
	const {
		className, value, placeholder, onChange,
		type = 'text',
		theme = InputTheme.NORMAL,
		size = InputSize.MEDIUM,
		...otherProps
	} = props;

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[size]]: true,
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<input
			className={classNames(classes.Input, mods, [className])}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChangeHandler}
		/>
	);
});
