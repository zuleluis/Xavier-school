import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosPersonales from './controlesEstudiante/datosPersonales';
import DatosPoderes from './controlesEstudiante/datosPoderes';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

const steps = ['Datos personales', 'Registro de poderes'];

const theme = createTheme();

export default function RegistroEstudiante() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFail, setIsFail] = React.useState(false);
  const [failPoderes, setFailPoderes] = React.useState(false);
  const [errorbd, setErrorbd] = useState(false);
  const [datos, setDatos] = React.useState({
    nombreEst : "",
    apellidoEst : "",
    nssEst : "",
    fechaEst : "",
    nivelEst : "",
    poderes : []
  });


  function getStepContent(step) {
    switch (step) {
      case 0:
          return <DatosPersonales setDatos={setDatos} datos={datos} setIsFail={setIsFail} isFail={isFail}/>
      case 1:
        return <DatosPoderes setDatos={setDatos} datos={datos}/>;
      default:
        throw new Error('Paso desconocido');
    }
  }

  const saveEstudiante = () => {
    axios.post ("http://localhost:5000/api/estudiantes/save", {
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
        'Content-type': 'application/json'
      }
    }).then ((response) => {
      if (response.status === 200) {
        setActiveStep(activeStep + 1)
        setErrorbd(false);
      }
    }, (error) => {
      console.log(error);
      setErrorbd(true);
    })
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      if(datos.poderes.length===0){
        setFailPoderes(true)
        return;
      }
      saveEstudiante();
    }
    else{
      if (activeStep + 1 === 1){
        if (datos.nombreEst==="" || datos.apellidoEst=== "" || datos.fechaEst ==="" || datos.nivelEst === "") {
          setIsFail(true)
          return;
        }
      }
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if(errorbd) return <Redirect to='/error'/>;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Registro de Estudiante
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Estudiante registrado exitosamente
                </Typography>
                <Typography variant="subtitle1">
                  ¡Bienvenido a Escuela Xavier para jóvenes talento!
                  Esperamos que tu estancia sea la mejor. 
                  ¡Mucho éxito en tu nueva etapa!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}

                <Collapse in={failPoderes}>
                    <Alert
                      action={
                        <IconButton aria-label="close" color="inherit" size="small"
                          onClick={() => {
                            setFailPoderes(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      severity="error">This is an error alert — check it out!</Alert>
                  </Collapse>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Retroceder
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Registrar' : 'Siguiente'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Typography>{datos.nombreEst} | {datos.apellidoEst} | {datos.fechaEst} | {datos.nssEst} | {datos.poderes} | {datos.nivelEst}</Typography>
      </Container>
    </ThemeProvider>
  );
}