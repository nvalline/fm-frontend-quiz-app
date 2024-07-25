import { useThemeContext } from '../contexts/themeContext';

// Styles
import '../styles/components/CategoryLogo.scss';

export default function CategoryLogo({
	icon,
	category
}: {
	icon: string;
	category: string;
}) {
	const { isDarkTheme } = useThemeContext();
	const formatedIconPath = icon.slice(8);

	let bgColor = '';

	if (category == 'Accessibility') {
		bgColor = 'var(--clr-accent-purple)';
	} else if (category == 'HTML') {
		bgColor = 'var(--clr-accent-red)';
	} else if (category == 'CSS') {
		bgColor = 'var(--clr-accent-green)';
	} else if (category == 'JavaScript') {
		bgColor = 'var(--clr-accent-blue)';
	}

	return (
		<div className='logoWrapper'>
			<div className='iconWrapper' style={{ backgroundColor: bgColor }}>
				<img src={formatedIconPath} alt={category} height={40} width={40} />
			</div>
			<h2
				className={
					isDarkTheme ? `${'iconHeading'} ${'darkTheme'}` : 'iconHeading'
				}
			>
				{category}
			</h2>
		</div>
	);
}
