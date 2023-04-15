import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { selectProcAuthData } from 'entities/ProcAuthLogin';

const RouterProvider = () => {
	const authData = useSelector(selectProcAuthData);

	const routeAvailable = (item: AppRoutesProps) => {
		return (
			!authData
				? (item.isAuthOnly ? false : true)
				: true
		);
	};

	return (
		<Routes>
			{Object.values(routeConfig).filter(routeAvailable).map(({ element, path }) => (
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
