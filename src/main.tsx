import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeContextProvider from './contexts/themeContext.tsx';

// Components
import App from './App.tsx';

// Styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>
	</React.StrictMode>
);
