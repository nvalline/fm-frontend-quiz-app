import { useEffect, useState } from 'react';
import { useDataContext } from '../contexts/dataContext';
import correctIcon from '../assets/images/icon-correct.svg';
import errorIcon from '../assets/images/icon-error.svg';

// Components

// Styles
import '../styles/layout/Questions.scss';

type CategoryProps = {
	category: string;
};

export default function Questions({ category }: CategoryProps) {
	const { data } = useDataContext();
	const [correctAnswer, setCorrectAnswer] = useState<string>('');
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [score, setScore] = useState<number>(0);
	const [questionNumber, setQuestionNumber] = useState<number>(0);

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

	const handleChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log('EVENT:', event.currentTarget.value);

		if (event.currentTarget.value === correctAnswer) {
			console.log('CORRECT ANSWER');
			setIsCorrect(true);
			setScore(score + 1);
		} else {
			console.log('WRONG ANSWER');
			setIsCorrect(false);
		}
	};

	console.log('SCORE:', score);

	useEffect(() => {
		setCorrectAnswer(questionData.answer);
	}, [questionData, setCorrectAnswer]);

	// console.log('Question:', questionData);

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
						<button type='button' value={option} onClick={handleChoice}>
							<span className='optionIdentifier'>
								{String.fromCharCode(65 + index)}
							</span>
							{option}
							<span>
								{isCorrect !== null &&
									(isCorrect ? (
										<img src={correctIcon} alt='correct' />
									) : (
										<img src={errorIcon} alt='incorrect' />
									))}
							</span>
						</button>
					</li>
				))}
			</ul>
			<button className='submitButton'>Submit Answer</button>
		</form>
	);
}
