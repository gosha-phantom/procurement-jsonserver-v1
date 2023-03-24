import { RouteProps } from 'react-router-dom';
import {
	MainPage, NotFoundPage,
} from 'pages';

// ссылки для авторизованных пользователей
// type AppRouteProps = RouteProps & {
//     authOnly?: boolean;
// }

export enum AppRoutes {
    MAIN = 'main',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	// последний
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	// last
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
