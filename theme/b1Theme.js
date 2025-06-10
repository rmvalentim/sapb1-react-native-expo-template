import { DefaultTheme } from 'react-native-paper';

export const b1ThemeTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F5FA6',      
    accent: '#F0AB00',       
    background: '#F5F5F5',   
    surface: '#FFFFFF',      
    text: '#2C2C2C',         
    placeholder: '#888888',
    disabled: '#CCCCCC',
    backdrop: 'rgba(0, 0, 0, 0.1)',
    onSurface: '#2C2C2C',
    notification: '#F0AB00', 
  },
};