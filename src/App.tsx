import { useThemeContext } from './contexts/themeContext';

// Components
import Header from './layout/Header';
import Welcome from './layout/Welcome';

// Styles
import './App.scss';

// Data
import quizData from '../data/data.json';
console.log('DATA:', quizData.quizzes);

function App() {
	const { theme } = useThemeContext();

	console.log('THEME', theme);

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
