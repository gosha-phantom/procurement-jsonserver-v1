import React from 'react';
import { RouterProvider } from 'app/providers';
import './styles/app.scss';

function App() {
	return (
		<div className="app">
			<div className={'content'}>
				<RouterProvider />
			</div>
		</div>
	);
}

export default App;
