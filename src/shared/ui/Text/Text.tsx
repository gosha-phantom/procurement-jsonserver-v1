import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextSizeEnum {
    SMALL = 'text-small',
    MEDIUM = 'text-medium',
    LARGE = 'text-large',
    XL = 'text-xl',
}

export type TextColorType = 'red' | 'primary'

const TextColorClasses: Record<TextColorType, string> = {
	red: 'color-red',
	primary: 'color-primary'
};

interface TextProps {
    className?: string;
    children?: ReactNode;
    size?: TextSizeEnum;
    disabled?: boolean;
    color?: TextColorType;
}

export const Text = memo((props: TextProps) => {
	const {
		className, size = TextSizeEnum.MEDIUM, children, disabled, color = 'primary'
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
