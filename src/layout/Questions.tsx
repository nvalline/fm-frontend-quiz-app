import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDataContext } from '../contexts/dataContext';

export default function Questions() {
	const { data } = useDataContext();
	const [searchParams] = useSearchParams();
	const [quizCategory, setQuizCategory] = useState<string>();

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	let quiz;

	switch (quizCategory) {
		case 'HTML':
			quiz = quizData[0];
			break;
		case 'CSS':
			quiz = quizData[1];
			break;
		case 'JavaScript':
			quiz = quizData[2];
			break;
		case 'Accessibility':
			quiz = quizData[3];
			break;
	}

	useEffect(() => {
		const category = searchParams.get('c')?.toString();
		setQuizCategory(category);
	}, [searchParams]);

	console.log('DATA:', quiz);

	return (
		<>
			<div className='questionWrapper'>
				<p>{`Question 1 of 10`}</p>
				<h2>Question</h2>
				<div className='progressBar'></div>
			</div>
			<div className='answersWrapper'></div>
			<button>Submit Answer</button>
		</>
	);
}
