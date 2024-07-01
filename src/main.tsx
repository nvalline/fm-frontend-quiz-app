import React from 'react';
import ReactDOM from 'react-dom/client';
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
				<App />
			</DataContextProvider>
		</ThemeContextProvider>
	</React.StrictMode>
);
