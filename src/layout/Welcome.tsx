// Components
import CategoryLogo from '../components/CategoryLogo';

// Styles
import '../styles/layout/Welcome.scss';

const icon = '/images/icon-accessibility.svg';
const category = 'Accessibility';

export default function Welcome() {
	return (
		<>
			<div className='titleWrapper'>
				<h1 className='title'>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p className='subTitle'>Pick a subject to get started.</p>
			</div>
			<CategoryLogo icon={icon} category={category} />
		</>
	);
}
