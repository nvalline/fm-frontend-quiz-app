import { useState } from 'react';
import { useDataContext } from '../contexts/dataContext';
import { useThemeContext } from '../contexts/themeContext';
import correctIcon from '../assets/images/icon-correct.svg';
import errorIcon from '../assets/images/icon-error.svg';

// Components
import Button from '../components/Button';
import ErrorMsg from '../components/ErrorMsg';
import Header from './Header';

// Styles
import '../styles/layout/Questions.scss';

type AnswerState = {
	correctAnswer: string;
	correctAnswerIndex: number | null;
	isCorrect: boolean | null;
};

type CategoryProps = {
	category: string;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	setShowScoreboard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Questions({
	category,
	score,
	setScore,
	setShowScoreboard
}: CategoryProps) {
	const { data } = useDataContext();
	const { isDarkTheme } = useThemeContext();
	const [choice, setChoice] = useState<string>('');
	const [questionNumber, setQuestionNumber] = useState<number>(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [showSubmitButton, setShowSubmitButton] = useState(true);
	const [showErrorMessage, setShowErrorMessage] = useState(false);

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
	const questionsLength = quiz.questions.length;

	const handleChoice = (
		event: React.MouseEvent<HTMLButtonElement>,
		index: number,
		option: string
	) => {
		const answer = questionData.answer;

		event.preventDefault();

		setSelected(index);
		setChoice(option);
		setShowErrorMessage(false);
		setAnswerState((prevState) => {
			prevState.correctAnswer = questionData.answer;
			prevState.correctAnswerIndex = questionData.options.indexOf(answer);
			return { ...prevState };
		});
	};

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		// Show error message
		if (!choice) {
			setShowErrorMessage(true);
			return;
		}

		setShowSubmitButton(false);

		if (choice === answerState.correctAnswer) {
			setAnswerState((prevState) => {
				prevState.isCorrect = true;
				return { ...prevState };
			});
			setScore(score + 1);
		} else {
			setAnswerState((prevState) => {
				prevState.isCorrect = false;
				return { ...prevState };
			});
		}
	};

	const handleNextQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (questionNumber + 1 === questionsLength) {
			setShowScoreboard(true);
			return;
		}

		setChoice('');
		setSelected(null);
		setAnswerState((prevState) => {
			prevState.correctAnswer = '';
			prevState.correctAnswerIndex = null;
			prevState.isCorrect = null;
			return { ...prevState };
		});
		setShowSubmitButton(true);
		setQuestionNumber(questionNumber + 1);
	};

	return (
		<>
			<Header category={category} />
			<section>
				<form className={isDarkTheme ? `${'form'} ${'darkTheme'}` : 'form'}>
					<div className='questionWrapper'>
						<div className='contentBlock'>
							<p>{`Question ${questionNumber + 1} of ${questionsLength}`}</p>
							<h2>{questionData.question}</h2>
						</div>
						<progress
							value={questionNumber + 1}
							max={quiz.questions.length}
							className='progressBar'
						></progress>
					</div>
					<div>
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
											} ${
												showCheckMark && selected === index
													? 'selected correct'
													: ''
											} ${
												showXMark && selected === index
													? 'selected incorrect'
													: ''
											}`}
										>
											<span className='optionIdentifier'>
												{String.fromCharCode(65 + index)}
											</span>
											{option}
											<span className='statusIcon'>
												{showCheckMark && (
													<img src={correctIcon} alt='correct' />
												)}
												{showXMark && <img src={errorIcon} alt='incorrect' />}
											</span>
										</button>
									</li>
								);
							})}
						</ul>
						{showSubmitButton ? (
							<Button
								onclick={handleSubmit}
								className='submitButton'
								text='Submit Answer'
							/>
						) : (
							<Button
								onclick={handleNextQuestion}
								className='submitButton'
								text='Next Question'
							/>
						)}
						{showErrorMessage && (
							<ErrorMsg
								errorIcon={errorIcon}
								message='Please select an answer'
							/>
						)}
					</div>
				</form>
			</section>
		</>
	);
}
