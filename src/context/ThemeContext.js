// src/context/ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors ,darkColors} from '../theme/color';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // 'light' or 'dark'
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const [isOverride, setIsOverride] = useState(false); // manual toggle flag

  useEffect(() => {
    if (!isOverride) {
      setIsDark(systemScheme === 'dark');
    }
  }, [systemScheme, isOverride]);

  const toggleTheme = () => {
    setIsOverride(true);
    setIsDark((prev) => !prev);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
