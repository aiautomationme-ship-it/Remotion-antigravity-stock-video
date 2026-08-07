import React, { createContext, useContext, useState } from 'react';
import { themes, ThemeType } from './themes';

const ThemeContext = createContext<{
	theme: ThemeType;
	setTheme: (themeName: keyof typeof themes) => void;
}>({
	theme: themes.GlassPremium,
	setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode, initialTheme?: keyof typeof themes }> = ({ children, initialTheme = 'GlassPremium' }) => {
	const [themeName, setThemeName] = useState<keyof typeof themes>(initialTheme);

	return (
		<ThemeContext.Provider value={{ theme: themes[themeName], setTheme: setThemeName }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext).theme;
