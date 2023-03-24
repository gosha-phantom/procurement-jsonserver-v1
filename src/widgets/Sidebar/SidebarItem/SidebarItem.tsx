import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui';
import { SidebarItemType } from './sidebarItemsList';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
    className?: string;
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { className, item, collapsed } = props;
	const mods: Mods = {
		[classes.collapsed]: collapsed
	};

	return (
		<AppLink
			to={item.path}
			className={classNames(classes.item, mods, [className])}
		>
			<item.Icon className={classes.icon} />
			<span className={classes.link}>
				{item.text}
			</span>
		</AppLink>
	);
});
