import React from 'react'
import NavBar from './components/NavBar'
import { createTheme, ThemeProvider} from '@material-ui/core/styles';
import MainRoutes from './MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import useStyles from './styles/Styles';


const theme = createTheme({
  palette: {
    primary: {
      light: '#A3DDCB',
      main: '#03506F',
      dark: '#0A043C',
      contrastText: '#FFFFFF',
    },
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme = {theme}>
          <header>
            <NavBar/>
          </header>
          <main className = {classes.main}>
            <MainRoutes/>
          </main>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}
