import { DefaultTheme } from 'react-native-paper';

export const customTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A814F',       // Verde principal
    accent: '#A0C3A8',        // Verde mais claro para destaque
    background: '#F9FAFB',    // Quase branco (moderno e suave)
    surface: '#FFFFFF',       // Superfícies como cards e containers
    text: '#333333',          // Texto em cinza escuro, não preto
    placeholder: '#888888',   // Cor de placeholders
    disabled: '#D1D5DB',      // Cinza claro para itens desabilitados
    backdrop: 'rgba(0,0,0,0.1)',
    onSurface: '#333333',     // Cor de texto sobre surface
    notification: '#4A814F',
  },
};