import React from 'react'
import NavBar from './components/NavBar'
import Card from './components/Card';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A3DDCB',
      main: '#03506F',
      dark: '#0A043C',
      contrastText: '#FFFFFF',
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(5)
  },
}));

export default function App() {
  const classes = useStyles();
  return (
      <div className="App">
        <ThemeProvider theme = {theme}>
          <header>
            <NavBar />
          </header>

          <main className = {classes.main}>
            <Card
              imgPath = "media/students.jpg"
              imgText = "Xavier's School Studients"
              Title = "Estudiantes"
              Description = "Gestion de estudiantes"
            />
            <Card
              imgPath = "media/teachers.jpg"
              imgText = "Xavier's School Teachers"
              Title = "Profesores"
              Description = "Gestion de Profesores"
            />
            <Card
              imgPath = "media/lessons.jpg"
              imgText = "Xavier's School Lessons"
              Title = "Lecciones"
              Description = "Gestion de Lecciones"
            />

            <Card
              imgPath = "media/presentations.jpg"
              imgText = "Xavier's School Presentations"
              Title = "Presentaciones"
              Description = "Gestion de Presentaciones"
            />
          </main>
        </ThemeProvider>
      </div>
  );
}
