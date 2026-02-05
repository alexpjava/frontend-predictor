import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
// Ya no necesitas './index.css' si vas a usar Material UI al 100%
// import './index.css' 

// Creamos un tema personalizado para controlar los colores de toda la App
const theme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiarlo a 'dark' para modo oscuro
    primary: {
      main: '#1976d2', // El azul estándar de Material
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f7f6', // El color grisáceo que te gustaba para el fondo
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline limpia los márgenes por defecto y aplica el color de fondo del tema */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)