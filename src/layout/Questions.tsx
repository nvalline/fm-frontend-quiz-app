import { useEffect, useState } from 'react';
import { useDataContext } from '../contexts/dataContext';

// Styles
import '../styles/layout/Questions.scss';

type CategoryProps = {
	category: string;
};

export default function Questions({ category }: CategoryProps) {
	const { data } = useDataContext();
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [correctAnswer, setCorrectAnswer] = useState<string>('');

	const quizData = JSON.parse(JSON.stringify(data.quizzes));

	let quiz;

	switch (category) {
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

	const questionData = quiz.questions[questionNumber];

	useEffect(() => {
		setCorrectAnswer(questionData.answer);
	}, [questionData, setCorrectAnswer]);

	console.log('Question:', questionData);

	return (
		<form>
			<div className='questionWrapper'>
				<p>{`Question ${questionNumber + 1} of ${quiz.questions.length}`}</p>
				<h2>{questionData.question}</h2>
				<progress
					value={questionNumber + 1}
					max={quiz.questions.length}
					className='progressBar'
				></progress>
			</div>
			<ul className='optionsWrapper'>
				{questionData.options.map((option: string, index: number) => (
					<li key={index}>
						<span className='optionIdentifier'>
							{String.fromCharCode(65 + index)}
						</span>
						{option}
					</li>
				))}
			</ul>
			<button>Submit Answer</button>
		</form>
	);
}
