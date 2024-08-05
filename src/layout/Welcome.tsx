import { useDataContext } from '../contexts/dataContext';
import { useThemeContext } from '../contexts/themeContext';

// Components
import CategoryLogo from '../components/CategoryLogo';
import Header from './Header';

// Styles
import '../styles/layout/Welcome.scss';

type NavigateToCategoryProps = {
	navigateToCategory: (search: string) => void;
};

type Quiz = {
	title: string;
	icon: string;
	questions: { question: string; options: string[]; answer: string }[];
};

export default function Welcome({
	navigateToCategory
}: NavigateToCategoryProps) {
	const { data } = useDataContext();
	const { isDarkTheme } = useThemeContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	return (
		<>
			<Header category='' />
			<section>
				<div className={isDarkTheme ? 'welcome darkTheme' : 'welcome'}>
					<div className='titleWrapper'>
						<h1 className='title'>
							Welcome to the <span>Frontend Quiz!</span>
						</h1>
						<p className='subTitle'>Pick a subject to get started.</p>
					</div>
					<div className='categories'>
						{quizData.map((quiz: Quiz, index: number) => {
							return (
								<div
									key={index}
									className='categoryWrapper'
									onClick={() => navigateToCategory(`${quiz.title}`)}
								>
									<CategoryLogo icon={quiz.icon} category={quiz.title} />
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}
