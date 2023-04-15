import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ReactComponent as OrdersIcon } from 'shared/assets/icons/order-list.svg';
import { ReactComponent as OrderProductsIcon } from 'shared/assets/icons/order-products.svg';
import { ReactComponent as TemplateIcon } from 'shared/assets/icons/templateIcon.svg';
import { ReactComponent as NewOrderIcon } from 'shared/assets/icons/new-document.svg';

export interface SidebarItemType {
    path: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
	isAuthOnly?: boolean;
}

export const sidebarItemsList: SidebarItemType[] = [
	{
		path: RoutePath.template,
		Icon: TemplateIcon,
		text: 'Тестовая страница'
	},
	{
		path: RoutePath.proc_orders,
		Icon: OrdersIcon,
		text: 'Заказы на закупку'
	},
	{
		path: RoutePath.proc_orders_products,
		Icon: OrderProductsIcon,
		text: 'Детализация заказов'
	},
	{
		path: RoutePath.proc_order_create,
		Icon: NewOrderIcon,
		text: 'Новый заказ на закупку',
		isAuthOnly: true,
	},
];
