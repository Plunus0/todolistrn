import React, { createContext, useContext, useReducer } from "react";

// Define theme state and actions
interface ThemeState {
  darkMode: boolean;
}

type ThemeAction = { type: "TOGGLE_THEME" };

const initialState: ThemeState = {
  darkMode: false,
};

// Reducer function
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, darkMode: !state.darkMode };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create Context
const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
} | null>(null);

// Provider
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
