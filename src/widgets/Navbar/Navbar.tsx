import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReactComponent as CompanyLogo } from 'shared/assets/icons/some-logo.svg';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;

	return (
		<header className={classNames(classes.Navbar, {}, [className])}>
			<CompanyLogo className={classes.logo}/>
			<div className={classes.title}>COMPANY NAME</div>
			<div className={classes.links}>Sign IN</div>
		</header>
	);
});

