import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
	const {
		to,
		className,
		children,
		theme = AppLinkTheme.PRIMARY,
		...otherProps
	} = props;

	const mods: Mods = {
		[classes[theme]]: theme,
	};

	return (
		<Link
			to={to}
			className={classNames(classes.AppLink, mods, [className])}
			{...otherProps}
		>{children}</Link>
	);
});
