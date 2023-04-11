import { memo, useState } from 'react';
import { ReactComponent as CompanyLogo } from 'shared/assets/icons/some-logo.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonThemeTypes, HStack, Modal } from 'shared/ui';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
	const { className } = props;
	const [authModalIsOpen, setAuthModalIsOpen] = useState<boolean>(false);

	return (
		<header className={classNames(classes.Navbar, {}, [className])}>
			<Modal isOpen={authModalIsOpen} setIsOpen={setAuthModalIsOpen}>
				<h2>Test Modal Title</h2>
				<p>Some text inside modal</p>
				<button onClick={() => setAuthModalIsOpen(false)}>Close modal</button>
			</Modal>
			<CompanyLogo className={classes.logo}/>
			<div className={classes.title}>COMPANY NAME</div>
			<div className={classes.links}>
				<Button
					theme={ButtonThemeTypes.CLEAR}
					onClick={() => setAuthModalIsOpen(true)}
				>Sign IN</Button>

			</div>
		</header>
	);
});

