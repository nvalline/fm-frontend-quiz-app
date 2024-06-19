// Styles
import '../styles/layout/Welcome.scss';

export default function Welcome() {
	return (
		<>
			<div className='titleWrapper'>
				<h1 className='title'>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p className='subTitle'>Pick a subject to get started.</p>
			</div>
		</>
	);
}
