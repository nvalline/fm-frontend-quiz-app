// Styles
import '../styles/components/ErrorMsg.scss';

type ErrorMsgProps = {
	errorIcon: string;
	message: string;
};

export default function ErrorMsg({ errorIcon, message }: ErrorMsgProps) {
	return (
		<div className='errorMessage'>
			<img src={errorIcon} alt='incorrect' />
			<p>{message}</p>
		</div>
	);
}
