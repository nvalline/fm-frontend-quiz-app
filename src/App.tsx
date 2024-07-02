import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const navigateToCategory = (category: string) => {
		setSearchParams({ c: category });
		navigate({ search: `?c=${category}` });
	};

	console.log('THEME', theme);

	useEffect(() => {
		setData(quizData);
	});

	return (
		<div>
			<Header />
			<section>
				{(searchParams.get('c') === 'HTML' && <p>HTML Component</p>) ||
					(searchParams.get('c') === 'CSS' && <p>CSS Component</p>) ||
					(!searchParams.get('c') && (
						<Welcome navigateToCategory={navigateToCategory} />
					))}
			</section>
		</div>
	);
}

export default App;
