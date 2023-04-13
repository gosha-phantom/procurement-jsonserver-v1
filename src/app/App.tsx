import { RouterProvider } from 'app/providers';
import { procAuthLoginActions } from 'entities/ProcAuthLogin';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib';
import { Navbar, Sidebar } from 'widgets';
import './styles/app.scss';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(procAuthLoginActions.getAuthDataFromLC());
	}, [dispatch]);

	return (
		<main className="app">
			<Navbar />
			<section className={'content'}>
				<Sidebar />
				<Suspense fallback="">
					<section className={'page-wrapper'}>
						<RouterProvider />
					</section>
				</Suspense>
			</section>
		</main>
	);
}

export default App;
