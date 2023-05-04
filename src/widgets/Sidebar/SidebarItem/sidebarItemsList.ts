import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import OrdersIcon from 'shared/assets/icons/order-list.svg';
import OrderProductsIcon from 'shared/assets/icons/order-products.svg';
import TemplateIcon from 'shared/assets/icons/templateIcon.svg';
import NewOrderIcon from 'shared/assets/icons/new-document.svg';

export interface SidebarItemType {
    path: string;
    Icon: string;
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
