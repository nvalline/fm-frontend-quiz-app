import { useState } from 'react';
import { useDataContext } from '../contexts/dataContext';
import correctIcon from '../assets/images/icon-correct.svg';
import errorIcon from '../assets/images/icon-error.svg';

// Components

// Styles
import '../styles/layout/Questions.scss';

type CategoryProps = {
	category: string;
};

type AnswerState = {
	correctAnswer: string;
	correctAnswerIndex: number | null;
	isCorrect: boolean | null;
};

export default function Questions({ category }: CategoryProps) {
	const { data } = useDataContext();
	const [choice, setChoice] = useState<string>('');
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [selected, setSelected] = useState<number | null>(null);

	const [answerState, setAnswerState] = useState<AnswerState>({
		correctAnswer: '',
		correctAnswerIndex: null,
		isCorrect: null
	});

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

	// console.log('QUESTION DATA', questionData);

	const handleChoice = (
		event: React.MouseEvent<HTMLButtonElement>,
		index: number,
		option: string
	) => {
		const answer = questionData.answer;

		event.preventDefault();

		setSelected(index);
		setChoice(option);
		setAnswerState((prevState) => {
			prevState.correctAnswer = questionData.answer;
			prevState.correctAnswerIndex = questionData.options.indexOf(answer);
			return { ...prevState };
		});

		// console.log('INDEX:', index);
		// console.log('EVENT:', option);
		// console.log('ANSWER STATE:', answerState);
	};

	const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (choice === answerState.correctAnswer) {
			// console.log('CORRECT ANSWER');
			setAnswerState((prevState) => {
				prevState.isCorrect = true;
				return { ...prevState };
			});
			setScore(score + 1);
		} else {
			// console.log('WRONG ANSWER');
			setAnswerState((prevState) => {
				prevState.isCorrect = false;
				return { ...prevState };
			});
		}
	};

	// console.log('SCORE:', score);

	return (
		<form onSubmit={handleSubmit}>
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
				{questionData.options.map((option: string, index: number) => {
					const showCheckMark =
						(answerState.isCorrect === true &&
							answerState.correctAnswerIndex === index) ||
						(answerState.isCorrect === false &&
							answerState.correctAnswerIndex === index);
					const showXMark =
						answerState.isCorrect === false && selected === index;

					return (
						<li key={index}>
							<button
								value={option}
								onClick={(event) => handleChoice(event, index, option)}
								className={`optionButton ${
									selected === index ? 'selected' : ''
								}`}
							>
								<span className='optionIdentifier'>
									{String.fromCharCode(65 + index)}
								</span>
								{option}
								<span className='statusIcon'>
									{showCheckMark && <img src={correctIcon} alt='correct' />}
									{showXMark && <img src={errorIcon} alt='incorrect' />}
								</span>
							</button>
						</li>
					);
				})}
			</ul>
			<button type='submit' className='submitButton'>
				Submit Answer
			</button>
		</form>
	);
}
