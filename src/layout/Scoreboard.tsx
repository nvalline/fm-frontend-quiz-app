import { useDataContext } from '../contexts/dataContext';

// Components
import Button from '../components/Button';
import CategoryLogo from '../components/CategoryLogo';

// Styles
import '../styles/layout/Scoreboard.scss';

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
	console.log('CATEGORY:', category);

	const { data } = useDataContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	const currentQuiz = quizData.filter((quiz: Quiz) => quiz.title === category);

	const numberOfQuestions = currentQuiz[0].questions.length;

	const handlePlayAgain = () => {
		console.log('REPLAY');
	};

	return (
		<div className='scoreboard'>
			<div className='scoreboard__heading'>
				<h2 className='scoreboard__title'>
					Quiz completed
					<br />
					<span>You scored...</span>
				</h2>
			</div>
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
				<h3>{score}</h3>
				<p>out of {numberOfQuestions}</p>
			</div>
			<Button
				text='Play Again'
				onclick={handlePlayAgain}
				className='submitButton'
			/>
		</div>
	);
}
