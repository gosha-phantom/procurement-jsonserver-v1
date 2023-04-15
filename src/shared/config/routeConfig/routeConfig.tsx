import { RouteProps } from 'react-router-dom';
import {
	MainPage, ProcOrdersPage, ProcOrdersProductsPage, ProcOrderCreatePage,
	NotFoundPage, TemplatePage, TemplatePage2
} from 'pages';

export type AppRoutesProps = RouteProps & {
    isAuthOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    PROC_ORDERS = 'proc_orders',
    PROC_ORDERS_PRODUCTS = 'proc_orders_products',
	PROC_ORDER_CREATE = 'proc_order_create',
    TEMPLATE = 'template',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.PROC_ORDERS]: '/procurementOrders',
	[AppRoutes.PROC_ORDERS_PRODUCTS]: '/procurementOrdersProducts',
	[AppRoutes.PROC_ORDER_CREATE]: '/proc/order/create',
	[AppRoutes.TEMPLATE]: '/template',
	// последний
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.PROC_ORDERS]: {
		path: RoutePath.proc_orders,
		element: <ProcOrdersPage />
	},
	[AppRoutes.PROC_ORDERS_PRODUCTS]: {
		path: RoutePath.proc_orders_products,
		element: <ProcOrdersProductsPage />
	},
	[AppRoutes.PROC_ORDER_CREATE]: {
		path: RoutePath.proc_order_create,
		element: <ProcOrderCreatePage />,
		isAuthOnly: true,
	},
	[AppRoutes.TEMPLATE]: {
		path: RoutePath.template,
		element: <MainPage />
	},
	// last
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
