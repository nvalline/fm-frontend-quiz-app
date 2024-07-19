import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDataContext } from './contexts/dataContext';
import { useThemeContext } from './contexts/themeContext';

// Components
import Header from './layout/Header';
import Scoreboard from './layout/Scoreboard';
import Questions from './layout/Questions';
import Welcome from './layout/Welcome';

// Styles
import './App.scss';

// Data
import quizData from '../data/data.json';

function App() {
	const { theme } = useThemeContext();
	const { setData } = useDataContext();
	const navigate = useNavigate();
	const [score, setScore] = useState<number>(0);
	const [showScoreboard, setShowScoreboard] = useState<boolean>(false);
	const [searchParams] = useSearchParams();
	const [paramsQuery, setParamsQuery] = useState<string>();

	const navigateToCategory = useCallback(
		(category: string) => {
			if (
				category === 'HTML' ||
				category === 'CSS' ||
				category === 'JavaScript' ||
				category === 'Accessibility'
			) {
				navigate({ search: `?c=${category}` });
			} else {
				navigate('/');
			}
		},
		[navigate]
	);

	console.log('THEME', theme);

	useEffect(() => {
		setData(quizData);

		const params = searchParams.get('c')?.toString();

		if (params) {
			navigateToCategory(params);
		}

		setParamsQuery(params);
	}, [navigateToCategory, setData, searchParams]);

	return (
		<div>
			<Header category={paramsQuery} />
			<section>
				{(showScoreboard && <Scoreboard score={score} />) ||
					(paramsQuery && (
						<Questions
							category={paramsQuery}
							score={score}
							setScore={setScore}
							setShowScoreboard={setShowScoreboard}
						/>
					)) ||
					(!paramsQuery && <Welcome navigateToCategory={navigateToCategory} />)}
			</section>
		</div>
	);
}

export default App;
