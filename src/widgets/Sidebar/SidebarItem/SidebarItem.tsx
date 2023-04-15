import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui';
import { SidebarItemType } from './sidebarItemsList';
import classes from './SidebarItem.module.scss';
import { useSelector } from 'react-redux';
import { selectProcAuthData } from 'entities/ProcAuthLogin';

interface SidebarItemProps {
    className?: string;
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { className, item, collapsed } = props;
	const authData = useSelector(selectProcAuthData);
	const mods: Mods = {
		[classes.collapsed]: collapsed
	};

	if (!authData && item.isAuthOnly) { return null; }

	return (
		<AppLink
			to={item.path}
			className={classNames(classes.item, {}, [className])}
		>
			<item.Icon className={classes.icon} />
			{!collapsed && (<span className={classNames(classes.link, mods, [])}>
				{item.text}
			</span>)}
			{/*<span className={classNames(classes.link, mods, [])}>*/}
			{/*	{item.text}*/}
			{/*</span>*/}
		</AppLink>
	);
});
