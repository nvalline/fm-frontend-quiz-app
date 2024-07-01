import { useDataContext } from '../contexts/dataContext';

// Components
import CategoryLogo from '../components/CategoryLogo';

// Styles
import '../styles/layout/Welcome.scss';

type Quiz = {
	title: string;
	icon: string;
	questions: { question: string; options: string[]; answer: string }[];
};

export default function Welcome() {
	const { data } = useDataContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	return (
		<>
			<div className='titleWrapper'>
				<h1 className='title'>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p className='subTitle'>Pick a subject to get started.</p>
			</div>

			{quizData.map((quiz: Quiz, index: number) => {
				return (
					<CategoryLogo key={index} icon={quiz.icon} category={quiz.title} />
				);
			})}
		</>
	);
}
