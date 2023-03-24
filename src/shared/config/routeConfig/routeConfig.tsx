import { RouteProps } from 'react-router-dom';
import {
	MainPage, ProcOrdersPage, ProcOrdersProductsPage, NotFoundPage,
} from 'pages';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    PROC_ORDERS = 'proc_orders',
    PROC_ORDERS_PRODUCTS = 'proc_orders_products',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.PROC_ORDERS]: '/procurementOrders',
	[AppRoutes.PROC_ORDERS_PRODUCTS]: '/procurementOrdersProducts',
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
	// last
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
