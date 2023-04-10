import { RouterProvider } from 'app/providers';
import { Suspense } from 'react';
import { Navbar, Sidebar } from 'widgets';
import './styles/app.scss';

function App() {

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
