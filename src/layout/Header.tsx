/// <reference types="vite-plugin-svgr/client" />

// Components
import MoonDark from '../assets/images/icon-moon-dark.svg?react';
// import MoonLight from '../assets/images/icon-moon-light.svg?react';
import SunDark from '../assets/images/icon-sun-dark.svg?react';
// import SunLight from '../assets/images/icon-sun-light.svg?react';
import ToggleSwitch from '../components/ToggleSwitch';
// import Icon from '../assets/images/icon-accessibility.svg?react';

// Styles
import '../styles/layout/Header.scss';

export default function Header() {
	return (
		<header>
			{/* <div className='categoryWrapper'>
				<div className='iconWrapper'>
					<Icon />
				</div>
				<h2>Category</h2>
			</div> */}
			<div className='themeSwitch'>
				<SunDark />
				<ToggleSwitch />
				<MoonDark />
			</div>
		</header>
	);
}
