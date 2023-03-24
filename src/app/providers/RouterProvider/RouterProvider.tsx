import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const RouterProvider = () => {
	// const isAuth = useSelector(getUserAuthData);
	//
	// const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
	// 	if (route.authOnly && !isAuth) {
	// 		return false;
	// 	}
	// 	return true;
	// }), [isAuth]);

	return (
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route
					key={path}
					path={path}
					element={(
						<Suspense fallback={<PageLoader />}>
							<div className="page-wrapper">
								{element}
							</div>
						</Suspense>
					)}
				/>
			))}
		</Routes>
	);
};

export default memo(RouterProvider);
