import { useEffect } from 'react';
import { useDataContext } from './contexts/dataContext';
import { useThemeContext } from './contexts/themeContext';

// Components
import Header from './layout/Header';
import Welcome from './layout/Welcome';

// Styles
import './App.scss';

// Data
import quizData from '../data/data.json';

function App() {
	const { theme } = useThemeContext();
	const { setData } = useDataContext();

	console.log('THEME', theme);

	useEffect(() => {
		setData(quizData);
	});

	return (
		<div>
			<Header />
			<section>
				<Welcome />
			</section>
		</div>
	);
}

export default App;
