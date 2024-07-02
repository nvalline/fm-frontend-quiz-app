import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DataContextProvider from './contexts/dataContext.tsx';
import ThemeContextProvider from './contexts/themeContext.tsx';

// Components
import App from './App.tsx';

// Styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<DataContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</DataContextProvider>
		</ThemeContextProvider>
	</React.StrictMode>
);
