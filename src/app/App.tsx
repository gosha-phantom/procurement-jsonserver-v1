import { RouterProvider } from 'app/providers';
import { Suspense } from 'react';
import './styles/app.scss';
import { Navbar, Sidebar } from 'widgets';

function App() {
	return (
		<div className="app">
			<Navbar />
			<div className={'content'}>
				<Suspense fallback="">
					<Sidebar />
					{/*<div className="page-wrapper">*/}
					<RouterProvider />
					{/*</div>*/}
				</Suspense>
			</div>
		</div>
	);
}

export default App;
