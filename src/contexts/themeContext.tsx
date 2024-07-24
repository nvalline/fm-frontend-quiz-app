import React, { createContext, useContext, useState } from 'react';

type ThemeContext = {
	isDarkTheme: Theme;
	setIsDarkTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

type Theme = boolean;

const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
	children
}: ThemeContextProviderProps) {
	const [isDarkTheme, setIsDarkTheme] = useState<Theme>(true);

	return (
		<ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
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
