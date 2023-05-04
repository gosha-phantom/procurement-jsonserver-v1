import { procAuthLoginActions, ProcAuthLoginModal, selectProcAuthData } from 'entities/ProcAuthLogin';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import CompanyLogo from 'shared/assets/icons/some-logo.svg';
import { classNames, useAppDispatch } from 'shared/lib';
import { Button, ButtonThemeEnum } from 'shared/ui';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const authData = useSelector(selectProcAuthData);

	const btnLogOutClick = useCallback(() => {
		dispatch(procAuthLoginActions.logout());
	}, [dispatch]);

	return (
		<header className={classNames(classes.Navbar, {}, [className])}>
			<ProcAuthLoginModal isOpen={authModalIsOpen} setIsOpen={() => setAuthModalIsOpen(false)} />
			<div className={classes.logo}><CompanyLogo /></div>
			<div className={classes.title}>COMPANY NAME</div>
			<div className={classes.links}>
				{!authData
					? <Button theme={ButtonThemeEnum.CLEAR} onClick={() => setAuthModalIsOpen(true)} >Sign IN</Button>
					: <Button theme={ButtonThemeEnum.CLEAR} onClick={btnLogOutClick} >Log OUT</Button>
				}
			</div>
		</header>
	);
});

