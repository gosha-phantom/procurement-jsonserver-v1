import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'app/providers';
import { Navbar, Sidebar } from 'widgets';
import { getUsers } from 'entities/Users';
import { useAppDispatch } from 'shared/lib/hooks/useAppdispatch';
import './styles/app.scss';

function App() {
	const dispatch = useAppDispatch();

	// load user list
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div className="app">
			<Navbar />
			<div className={'content'}>
				<Suspense fallback="">
					<Sidebar />
					<RouterProvider />
				</Suspense>
			</div>
		</div>
	);
}

export default App;
