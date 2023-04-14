import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextSize {
    SMALL = 'text-small',
    MEDIUM = 'text-medium',
    LARGE = 'text-large',
    XL = 'text-xl',
}

export type TextColor = 'red' | 'primary'

const TextColorClasses: Record<TextColor, string> = {
	red: 'color-red',
	primary: 'color-primary'
};

interface TextProps {
    className?: string;
    children?: ReactNode;
    size?: TextSize;
    disabled?: boolean;
    color?: TextColor;
}

export const Text = memo((props: TextProps) => {
	const {
		className, size = TextSize.MEDIUM, children, disabled, color = 'primary'
	} = props;

	const mods: Mods = {
		[classes[size]]: true,
		[classes.disabled]: disabled,
		[classes[TextColorClasses[color]]]: true
	};

	return (
		<div className={classNames(classes.Text, mods, [className])}>
			{children}
		</div>
	);
});
