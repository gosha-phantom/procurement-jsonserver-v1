import { InputHTMLAttributes, memo, forwardRef, ForwardedRef } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

export enum SimpleInputSizeTypes {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

export enum SimpleInputThemeTypes {
    CLEAR = 'theme-clear',
    RED = 'theme-red',
    NORMAL = 'theme-normal',
    UNDERLINED = 'theme-underlined',
    ROUNDED = 'theme-rounded',
}

export enum SimpleInputTextAlignTypes {
    START = 'text-align-start',
    CENTER = 'text-align-center',
    END = 'text-align-end'
}

export enum SimpleInputBGColorTypes {
    NONE = 'bg-color-none',
    WHITE = 'bg-color-white',
    PRIMARY = 'bg-color-primary',
    INVERTED = 'bg-color-inverted'
}

type HTMLSimpleInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'readOnly' | 'size'>
// DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>
// type HTMLSimpleInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'readOnly' | 'size'>

export interface SimpleInputProps extends HTMLSimpleInputProps {
    className?: string;
    theme?: SimpleInputThemeTypes;
    size?: SimpleInputSizeTypes;
    value?: string | number;
    bg_color?: SimpleInputBGColorTypes;
    textAlign?: SimpleInputTextAlignTypes;
}

export const SimpleInput = memo(forwardRef((props: SimpleInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		className, value,
		type = 'text',
		theme = '',
		size = SimpleInputSizeTypes.MEDIUM,
		bg_color = SimpleInputBGColorTypes.NONE,
		textAlign = SimpleInputTextAlignTypes.START,
		...otherProps
	} = props;

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
			ref={ref}
			{...otherProps}
		/>
	);
}));

// export const SimpleInputRef = memo(forwardRef(props: SimpleInputProps, ref) => {
//     return <SimpleInput />
// });
