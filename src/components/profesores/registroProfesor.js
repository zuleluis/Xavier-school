import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import LinkButton from '../linkButton';
import { Grid } from '@mui/material';
import { Redirect, useLocation } from 'react-router-dom';

const steps = ['Datos personales', 'Finalizar'];

const theme = createTheme();

export default function RegistroProfesor() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFail, setIsFail] = useState(false);
  const [errorbd, setErrorbd] = useState(false);
  const [datos, setDatos] = useState({
    nombreEst : "",
    apellidoEst : "",
    nssEst : "",
    fechaEst : "",
    nivelEst : "",
    poderes : []
  });

  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();


  function getStepContent(step) {
    switch (step) {
      case 0: return(
            <Typography>
                Vamos a registrar un profesor
            </Typography>
        );
      case 1: return(
          <Typography>
              Registro concluido exitosamente
          </Typography>
      );
      default:
        throw new Error('Paso desconocido');
    }
  }

  const saveEstudiante = () => {
    /*axios.post ("http://localhost:5000/api/estudiantes/save", {
      estudiante:  {
        nombreEstudiante: datos.nombreEst,
        apellidoEstudiante: datos.apellidoEst,
        fechaNacimiento: datos.fechaEst,
        nssEstudiante: datos.nssEst,
        activoOInactivo: 1,
        fkNivelpoderEst: datos.nivelEst
      },
      powers: datos.poderes
    },
    {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then ((response) => {
      if (response.status === 200) {*/
        setActiveStep(activeStep + 1)
        /*setErrorbd(false);
      }
    }, (error) => {
      //console.log(error);
      if(!error.response) setErrorbd(true);
      else{
        if (error.response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
          setToken('');
          setErrorbd(false);
        }
      }
    })*/
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      saveEstudiante();
    }
    else{
      /*if (activeStep + 1 === 1){
        if (datos.nombreEst==="" || datos.apellidoEst=== "" || datos.fechaEst ==="" || datos.nivelEst === "") {
          setIsFail(true)
          return;
        }
      }*/
      setActiveStep(activeStep + 1);
    }
  };


  if(errorbd) return <Redirect to='/error'/>;
  if(!token){
    return(
      <Redirect to={
        {
          pathname:'/login',
          state:{
            from: location
          }
        }
      }/>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Registro de Profesor
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h4"> Profesor registrado exitosamente </Typography>

                <Typography sx={{mb:2}}> Los siguientes datos fueron registrados: </Typography>
          
                {/* <Typography variant="h5" component="div"> {datos.nombreEst} {datos.apellidoEst} </Typography> */}
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Nombre </Typography>

                {/* <Typography variant="h5" component="div"> {datos.nivelEst} </Typography> */}
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Nivel de poder </Typography>

                {/* <Typography variant="h5" component="div"> {datos.fechaEst} </Typography> */}
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Fecha de Nacimiento </Typography>

                {/* <Typography variant="h5" component="div"> {datos.nssEst === '' ? "--" : datos.nssEst} </Typography> */}
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Número de Seguridad Social </Typography>

                {/* <Typography variant="h5" component="div"> {datos.poderes.length} </Typography> */}
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Cantidad de poderes </Typography>

                <Grid container>
                  <LinkButton
                    link = '/profesores'
                    buttonText = "Profesores"
                    buttonColor = "#03506F"
                    size="small"
                  />

                  <LinkButton
                    link = '/'
                    buttonText = "Inicio"
                    buttonColor = "#03506F"
                    size="small"
                  />
                </Grid>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1, backgroundColor: "#03506F" }}
                  >
                    {activeStep === steps.length - 1 ? 'Registrar' : 'Siguiente'}
                  </Button>
                </Box>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}