import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const RouterProvider = () => {
	return (
		<Routes>
			{Object.values(routeConfig).map(({ element, path }) => (
				<Route
					key={path}
					path={path}
					element={(
						<Suspense fallback={<PageLoader />}>
							<main className="page-wrapper">
								{element}
							</main>
						</Suspense>
					)}
				/>
			))}
		</Routes>
	);
};

export default memo(RouterProvider);
