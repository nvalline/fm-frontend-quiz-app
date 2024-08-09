import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../contexts/dataContext';
import { useThemeContext } from '../contexts/themeContext';

// Components
import Button from '../components/Button';
import CategoryLogo from '../components/CategoryLogo';

// Styles
import '../styles/layout/Scoreboard.scss';
import Header from './Header';

type Quiz = {
	title: string;
	icon: string;
	questions: { question: string; options: string[]; answer: string }[];
};

type ScoreboardProps = {
	category: string | undefined;
	score: number;
};

export default function Scoreboard({ category, score }: ScoreboardProps) {
	const navigate = useNavigate();
	const { data } = useDataContext();
	const { isDarkTheme } = useThemeContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	const currentQuiz = quizData.filter((quiz: Quiz) => quiz.title === category);

	const numberOfQuestions = currentQuiz[0].questions.length;

	return (
		<>
			<Header category={category} />
			<section>
				<div
					className={
						isDarkTheme ? `${'scoreboard'} ${'darkTheme'}` : 'scoreboard'
					}
				>
					<div className='scoreboard__heading'>
						<h2 className='scoreboard__title'>
							Quiz completed
							<br />
							<span>You scored...</span>
						</h2>
					</div>
					<div>
						<div className='scoreboard__board'>
							{category?.toString() === 'HTML' ||
							category?.toString() === 'CSS' ||
							category?.toString() === 'JavaScript' ||
							category?.toString() === 'Accessibility' ? (
								<CategoryLogo
									icon={currentQuiz[0].icon}
									category={currentQuiz[0].title}
								/>
							) : null}
							<div className='scoreboard__score'>
								<h3>{score}</h3>
								<p>out of {numberOfQuestions}</p>
							</div>
						</div>
						<Button
							text='Play Again'
							onclick={() => navigate('/')}
							className='submitButton'
						/>
					</div>
				</div>
			</section>
		</>
	);
}
