// src/context/ThemeContext.js
import React, {createContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {lightColors, darkColors} from '../theme/color';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const systemScheme = useColorScheme(); // 'light' or 'dark'
  // Remove isDark, always use dark theme
  const [isOverride, setIsOverride] = useState(false); // manual toggle flag

  useEffect(() => {
    if (!isOverride) {
      // Always dark, no-op
    }
  }, [systemScheme, isOverride]);

  const toggleTheme = () => {
    setIsOverride(true);
    // Always dark, no-op
  };

  const colors = darkColors;

  return (
    <ThemeContext.Provider value={{colors}}>{children}</ThemeContext.Provider>
  );
};
