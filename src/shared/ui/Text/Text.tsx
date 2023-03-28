import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextSize {
    SMALL = 'text-small',
    MEDIUM = 'text-medium',
    LARGE = 'text-large',
    XL = 'text-xl',
}

interface TextProps {
    className?: string;
    children?: ReactNode;
    size?: TextSize;
}

export const Text = memo((props: TextProps) => {
	const {
		className, size = TextSize.MEDIUM, children,
	} = props;

	const mods: Mods = {
		[classes[size]]: true,
	};

	return (
		<div className={classNames(classes.Text, mods, [className])}>
			{children}
		</div>
	);
});
