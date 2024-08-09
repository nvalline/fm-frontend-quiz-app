import { useThemeContext } from '../contexts/themeContext';

// Styles
import '../styles/components/ToggleSwitch.scss';

export default function ToggleSwitch() {
	const { isDarkTheme, setIsDarkTheme } = useThemeContext();

	return (
		<label className='toggle'>
			<input
				type='checkbox'
				checked={isDarkTheme}
				aria-label='dark mode switch'
				onChange={() => setIsDarkTheme(!isDarkTheme)}
			/>
			<span className='slider' />
		</label>
	);
}
