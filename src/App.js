import React from 'react'
import NavBar from './components/NavBar'
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import MainRoutes from './MainRoutes';
import { BrowserRouter } from 'react-router-dom';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(5),
    flexGrow:1
  },
}));

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
