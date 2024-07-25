import { useThemeContext } from '../contexts/themeContext';

// Styles
import '../styles/components/ErrorMsg.scss';

type ErrorMsgProps = {
	errorIcon: string;
	message: string;
};

export default function ErrorMsg({ errorIcon, message }: ErrorMsgProps) {
	const { isDarkTheme } = useThemeContext();

	return (
		<div className='errorMessage'>
			<img src={errorIcon} alt='incorrect' />
			<p className={isDarkTheme ? `${'darkTheme'}` : ''}>{message}</p>
		</div>
	);
}
