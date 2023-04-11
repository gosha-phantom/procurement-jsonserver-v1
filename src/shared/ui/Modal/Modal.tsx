import { Dialog } from '@headlessui/react';
import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib';
import classes from './Modal.module.scss';

export type ModalThemeTypes = 'ROUNDED' | 'SQUARED';
export type ModalContentWidthTypes = 'AUTO' |'50' | '60' | '70' | '80' | '90';

const ModalThemeClasses: Record<ModalThemeTypes, string> = {
	ROUNDED: 'theme-rounded',
	SQUARED: 'theme-squared',
};

const ModalContentWidthClasses: Record<ModalContentWidthTypes, string> = {
	AUTO: 'width-auto',
	50: 'width-50',
	60: 'width-60',
	70: 'width-70',
	80: 'width-80',
	90: 'width-90',
};

interface ModalProps {
    contentWidth?: ModalContentWidthTypes;
    theme?: ModalThemeTypes;
    children?: ReactNode;
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
}

export const Modal = memo((props: ModalProps) => {
	const {
		children, isOpen = false, setIsOpen,
		theme = 'ROUNDED', contentWidth = '50'
	} = props;

	const contentMods: Mods = {
		[classes[ModalThemeClasses[theme]]]: true,
		[classes[ModalContentWidthClasses[contentWidth]]]: true,
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen?.(false)}>
			<div
				className={classes.modal}
				onClick={() => setIsOpen?.(false)}
			>
				<div className={classNames(classes.content, contentMods, [])}>
					{children}
				</div>
			</div>
		</Dialog>
	);
});
