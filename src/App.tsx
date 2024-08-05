import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useDataContext } from './contexts/dataContext';
import { useThemeContext } from './contexts/themeContext';

// Components
import Scoreboard from './layout/Scoreboard';
import Questions from './layout/Questions';
import Welcome from './layout/Welcome';

// Styles
import './App.scss';

// Data
import quizData from '../data/data.json';

function App() {
	const { isDarkTheme, setIsDarkTheme } = useThemeContext();
	const { setData } = useDataContext();
	const navigate = useNavigate();
	const [quizCategory, setQuizCategory] = useState<string>('');
	const [score, setScore] = useState<number>(0);

	const navigateToCategory = useCallback(
		(category: string) => {
			if (
				category === 'HTML' ||
				category === 'CSS' ||
				category === 'JavaScript' ||
				category === 'Accessibility'
			) {
				setQuizCategory(category);
				navigate(`/${category}`);
			} else {
				navigate('/');
			}
		},
		[navigate]
	);

	const showScoreboard = () => {
		navigate('/scoreboard');
	};

	console.log('THEME', isDarkTheme);

	useEffect(() => {
		setData(quizData);
	}, [setData]);

	// Check local storage for dark mode setting
	useEffect(() => {
		const darkMode = localStorage.getItem('quizDarkMode');

		if (darkMode === 'light') {
			setIsDarkTheme(false);
		}
	}, [setIsDarkTheme]);

	useEffect(() => {
		localStorage.setItem('quizDarkMode', isDarkTheme ? 'dark' : 'light');
		document.body.classList.toggle('darkTheme', isDarkTheme);
	}, [isDarkTheme]);

	return (
		<main>
			<Routes>
				<Route
					path='/'
					element={<Welcome navigateToCategory={navigateToCategory} />}
				/>
				<Route
					path={`/${quizCategory}`}
					element={
						<Questions
							category={quizCategory}
							score={score}
							setScore={setScore}
							setShowScoreboard={showScoreboard}
						/>
					}
				/>
				<Route
					path={'/scoreboard'}
					element={<Scoreboard category={quizCategory} score={score} />}
				/>
			</Routes>
		</main>
	);
}

export default App;
