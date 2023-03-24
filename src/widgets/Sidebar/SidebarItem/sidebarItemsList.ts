import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ReactComponent as OrdersIcon } from 'shared/assets/icons/order-list.svg';
import { ReactComponent as OrderProductsIcon } from 'shared/assets/icons/order-products.svg';

export interface SidebarItemType {
    path: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
}

export const sidebarItemsList = [
	{
		path: RoutePath.proc_orders,
		Icon: OrdersIcon,
		text: 'Заказы на закупку'
	},
	{
		path: RoutePath.proc_orders_products,
		Icon: OrderProductsIcon,
		text: 'Детализация заказов'
	}
];
