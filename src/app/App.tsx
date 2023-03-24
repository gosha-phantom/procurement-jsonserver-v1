import { RouterProvider } from 'app/providers';
import { Suspense } from 'react';
import './styles/app.scss';

function App() {
	return (
		<div className="app">
			<div className={'content'}>
				<Suspense fallback="">
					<RouterProvider />
				</Suspense>
			</div>
		</div>
	);
}

export default App;
