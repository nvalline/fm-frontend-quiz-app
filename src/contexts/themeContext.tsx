import React, { createContext, useContext, useState } from 'react';

type ThemeContext = {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

type Theme = 'dark' | 'light';

const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
	children
}: ThemeContextProviderProps) {
	const [theme, setTheme] = useState<Theme>('dark');

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useThemeContext() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useThemeContext should be used in ThemeContextProvider');
	}

	return context;
}
