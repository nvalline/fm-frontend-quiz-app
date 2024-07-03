/// <reference types="vite-plugin-svgr/client" />

import { useDataContext } from '../contexts/dataContext';

// Components
import CategoryLogo from '../components/CategoryLogo';
import MoonDark from '../assets/images/icon-moon-dark.svg?react';
// import MoonLight from '../assets/images/icon-moon-light.svg?react';
import SunDark from '../assets/images/icon-sun-dark.svg?react';
// import SunLight from '../assets/images/icon-sun-light.svg?react';
import ToggleSwitch from '../components/ToggleSwitch';
// import Icon from '../assets/images/icon-accessibility.svg?react';

// Styles
import '../styles/layout/Header.scss';

type CategoryProps = {
	category: string | null;
};

type Quiz = {
	title: string;
	icon: string;
	questions: { question: string; options: string[]; answer: string }[];
};

export default function Header({ category }: CategoryProps) {
	const { data } = useDataContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	const currentQuiz = quizData.filter((quiz: Quiz) => quiz.title === category);

	return (
		<header>
			<div>
				{!category ? null : (
					<CategoryLogo
						icon={currentQuiz[0].icon}
						category={currentQuiz[0].title}
					/>
				)}
			</div>
			<div className='themeSwitch'>
				<SunDark />
				<ToggleSwitch />
				<MoonDark />
			</div>
		</header>
	);
}
