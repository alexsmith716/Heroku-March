import React, { useContext, useState, useEffect } from 'react';

const defaultMode = 'default';

// -----------------------------------------------------------

export type Props = {
	children: React.ReactNode;
};

export type ContextProps = {
	mode: string | undefined;
	toggleTheme: () => void;
};

export const Context = React.createContext<ContextProps>({
	mode: defaultMode,
	toggleTheme: () => {},
});

export const useTheme = (): ContextProps => useContext(Context);

// -----------------------------------------------------------

export const ThemeContext: React.FC<Props> = ({ children }) => {
	const [themeModeState, setThemeModeState] = useState({ mode: defaultMode });

	const toggleTheme = () => {
		setThemeModeState({ mode: themeModeState.mode === 'dark' ? `default` : `dark` });
	};

	return (
		<Context.Provider value={{ mode: themeModeState.mode, toggleTheme: toggleTheme }}>
			{children}
		</Context.Provider>
	);
};
