import { memo, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-left-circle.svg';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { sidebarItemsList } from '../SidebarItem/sidebarItemsList';
import classes from './SidebarMain.module.scss';

interface SidebarMainProps {
    className?: string;
}

export const SidebarMain = memo((props: SidebarMainProps) => {
	const { className } = props;
	const [collapsed, setCollapsed] = useState<boolean>(true);

	const mods: Mods = {
		[classes.collapsed]: collapsed
	};

	const onToggleCollapse = () => {
		setCollapsed(prev => !prev);
	};

	const itemsList = useMemo(() => sidebarItemsList.map((item) => {
		return (<SidebarItem key={item.path} item={item} collapsed={collapsed}/>);
	}), [collapsed]);

	return (
		<aside className={classNames(classes.SidebarMain, mods, [className])}>
			<ArrowIcon className={classes.collapseBtn} onClick={onToggleCollapse}/>
			<div className={classes.items}>
				{itemsList}
			</div>
		</aside>
	);
});
