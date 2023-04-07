import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';

export enum ButtonThemeTypes {
    CLEAR = 'theme-clear',
    OUTLINE = 'theme-outline',
    OUTLINE_RED = 'theme-outline-red',
    ROUNDED = 'theme-rounded',
    ROUNDED_RED = 'theme-rounded-red',
}

export enum ButtonSizeTypes {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonThemeTypes;
    size?: ButtonSizeTypes;
    children?: ReactNode;
    disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
	const {
		className, children,
		disabled = false, theme = ButtonThemeTypes.OUTLINE, size = ButtonSizeTypes.MEDIUM,
		...otherProps
	} = props;

	const mods: Mods = {
		[classes[theme]]: true,
		[classes[size]]: true,
		[classes.disabled]: disabled,
	};

	return (
		<button
			type="button"
			className={classNames(classes.button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>{children}</button>
	);
});
