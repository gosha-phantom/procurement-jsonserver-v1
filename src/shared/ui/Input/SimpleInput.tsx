import {
	memo, forwardRef, ForwardedRef, ComponentType, ComponentPropsWithoutRef
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

export enum SimpleInputWidthEnum {
    MAX_WIDTH = 'max-width',
    HALF_WIDTH = 'half-width',
    QUARTER_WIDTH = 'quarter-width',
}

export enum SimpleInputSizeEnum {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

export enum SimpleInputThemeEnum {
    CLEAR = 'theme-clear',
    RED = 'theme-red',
    NORMAL = 'theme-normal',
    UNDERLINED = 'theme-underlined',
    ROUNDED = 'theme-rounded',
}

export enum SimpleInputTextAlignEnum {
    START = 'text-align-start',
    CENTER = 'text-align-center',
    END = 'text-align-end'
}

export enum SimpleInputBGColorEnum {
    NONE = 'bg-color-none',
    WHITE = 'bg-color-white',
    PRIMARY = 'bg-color-primary',
    INVERTED = 'bg-color-inverted'
}

export type SimpleInputElements = 'input' | 'textarea';

type SimpleInputAdditionalProps<Type extends SimpleInputElements | ComponentType> =
    Type extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[Type]
        : ComponentPropsWithoutRef<Type>

// type HTMLSimpleInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'readOnly' | 'size'>
// DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>
// type HTMLSimpleInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'readOnly' | 'size'>

// export interface SimpleInputProps extends HTMLSimpleInputProps {
//     className?: string;
//     theme?: SimpleInputThemeEnum;
//     size?: SimpleInputSizeEnum;
//     value?: string | number;
//     bg_color?: SimpleInputBGColorEnum;
//     textAlign?: SimpleInputTextAlignEnum;
//     width?: SimpleInputWidthEnum;
//     disabled?: boolean;
// }

export type SimpleInputProps<Type extends SimpleInputElements | ComponentType> = {
    className?: string;
    theme?: SimpleInputThemeEnum;
    size?: SimpleInputSizeEnum;
    value?: string | number;
    bg_color?: SimpleInputBGColorEnum;
    textAlign?: SimpleInputTextAlignEnum;
    width?: SimpleInputWidthEnum;
    disabled?: boolean;
    as?: Type;
    type?: string;
} & SimpleInputAdditionalProps<Type>

export const SimpleInput = memo(forwardRef(<Type extends SimpleInputElements | ComponentType<any> = 'input'>
	(props: SimpleInputProps<Type>, ref: ForwardedRef<HTMLInputElement | Type>) => {

	const {
		className, value, as,
		type = 'text',
		theme = '',
		size = SimpleInputSizeEnum.MEDIUM,
		bg_color = SimpleInputBGColorEnum.NONE,
		textAlign = SimpleInputTextAlignEnum.START,
		width = SimpleInputWidthEnum.MAX_WIDTH,
		disabled = false,
		...otherProps
	} = props;

	const Component = as || 'input';

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[size]]: true,
		[classes[bg_color]]: true,
		[classes[textAlign]]: true,
		[classes[width]]: true,
	};

	return (
		<Component
			className={classNames(classes.Input, mods, [className])}
			type={type}
			value={value}
			ref={ref}
			disabled={disabled}
			{...otherProps}
		/>
	);
}));
