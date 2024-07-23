// Styles
import '../styles/components/ToggleSwitch.scss';

export default function ToggleSwitch() {
	return (
		<label className='toggle'>
			<input type='checkbox' defaultChecked />
			<span className='slider' />
		</label>
	);
}
