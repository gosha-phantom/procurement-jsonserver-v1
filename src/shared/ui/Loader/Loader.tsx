import { classNames, Mods } from 'shared/lib';
import classes from './Loader.module.scss';

export enum LoaderSize {
    SMALL = 'size-small',
    MEDIUM = 'size-medium',
    LARGE = 'size-large',
    XL = 'size-xl',
}

interface LoaderProps {
    className?: string;
    size?: LoaderSize;
}

export const Loader = ({ className, size = LoaderSize.XL }: LoaderProps) => {
	const mods: Mods = {
		[classes[size]]: true
	};
	return (
		<div className={classNames(classes.loaderWrapper, {}, [className])}>
			<div className={classNames(classes.loader, mods, [])}></div>
		</div>
	);
};
