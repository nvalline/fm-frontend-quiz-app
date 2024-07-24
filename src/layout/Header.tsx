/// <reference types="vite-plugin-svgr/client" />

import { useDataContext } from '../contexts/dataContext';
import { useThemeContext } from '../contexts/themeContext';

// Components
import CategoryLogo from '../components/CategoryLogo';
import MoonDark from '../assets/images/icon-moon-dark.svg?react';
import MoonLight from '../assets/images/icon-moon-light.svg?react';
import SunDark from '../assets/images/icon-sun-dark.svg?react';
import SunLight from '../assets/images/icon-sun-light.svg?react';
import ToggleSwitch from '../components/ToggleSwitch';

// Styles
import '../styles/layout/Header.scss';

type CategoryProps = {
	category: string | undefined;
};

type Quiz = {
	title: string;
	icon: string;
	questions: { question: string; options: string[]; answer: string }[];
};

export default function Header({ category }: CategoryProps) {
	const { data } = useDataContext();
	const { isDarkTheme } = useThemeContext();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	const currentQuiz = quizData.filter((quiz: Quiz) => quiz.title === category);

	return (
		<header>
			<div>
				{category?.toString() === 'HTML' ||
				category?.toString() === 'CSS' ||
				category?.toString() === 'JavaScript' ||
				category?.toString() === 'Accessibility' ? (
					<CategoryLogo
						icon={currentQuiz[0].icon}
						category={currentQuiz[0].title}
					/>
				) : null}
			</div>
			<div className='themeSwitch'>
				{isDarkTheme === true ? <SunLight /> : <SunDark />}
				<ToggleSwitch />
				{isDarkTheme === true ? <MoonLight /> : <MoonDark />}
			</div>
		</header>
	);
}
