import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDataContext } from './contexts/dataContext';
import { useThemeContext } from './contexts/themeContext';

// Components
import Header from './layout/Header';
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
	const [searchParams, setSearchParams] = useSearchParams();
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
	}, [navigateToCategory, setData, searchParams, setSearchParams]);

	return (
		<div>
			<Header category={paramsQuery} />
			<section>
				{(paramsQuery && <Questions category={paramsQuery} />) ||
					(!paramsQuery && <Welcome navigateToCategory={navigateToCategory} />)}
			</section>
		</div>
	);
}

export default App;
