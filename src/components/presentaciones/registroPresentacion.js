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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { Redirect, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import LinkButton from '../linkButton';
import DatosEstudiantes from './controles/datosEstudiantes';

const steps = ['Datos de la presentación', 'Selección de estudiantes', 'Selección de profesores'];

const theme = createTheme();

export default function RegistroPresentacion() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFail, setIsFail] = useState(false);
  const [errorbd, setErrorbd] = useState(false);
  const [datos, setDatos] = useState({
        nombrePresentacion: "",
        fechaPresentacion: "",
        hora: "",
  });
  const [datosEstudiantes, setDatosEstudiantes] = useState([
    [{
      idEstudiante:"",
      asistio:""
    }]
  ]);
  const [failEstudiante, setFailEstudiante] = useState(false);
  const [failProfesor, setFailProfesor] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();

  const handleChange = e => {
    const {name, value} = e.target;
    setDatos({
    ...datos,
    [name] : value
    })
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
          return(
            <Fragment>
              <Typography variant="h6" gutterBottom>
                Datos de la presentación
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nombrePresentacion"
                    label="Nombre"
                    fullWidth
                    variant="outlined"
                    name = "nombrePresentacion"
                    error= { datos.nombrePresentacion === "" && isFail}
                    defaultValue={datos.nombrePresentacion}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid container spacing={3} margin={1} justifyContent="space-between">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="fechaPresentacion"
                      label="Fecha" 
                      type="date"
                      variant="outlined"
                      name="fechaPresentacion"
                      defaultValue={datos.fechaPresentacion}
                      error={datos.fechaPresentacion === "" && isFail}
                      onChange={handleChange}
                      InputLabelProps={{shrink: true}}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="hora"
                      label="Hora" 
                      type="time"
                      variant="outlined"
                      name="hora"
                      defaultValue={datos.hora}
                      error={datos.hora === "" && isFail}
                      onChange={handleChange}
                      InputLabelProps={{shrink: true}}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          );
      case 1:
        return(
            <DatosEstudiantes setDatosEstudiantes={setDatosEstudiantes} datosEstudiantes={datosEstudiantes}/>
        );
      case 2:
          return(
            <Typography>
                Datos de profesores
            </Typography>
          );
          /*return(
              <DatosProfesores setDatos={setDatos} datos={datos} flagProfesores={flagProfesores} setFlagProfesores={setFlagProfesores}/>
          )*/
      default:
        throw new Error('Paso desconocido');
    }
  }

  const savePresentacion = () => {
    axios.post ("http://localhost:5000/api/presentaciones/save", {
        presentacion:{
            nombrePresentacion: datos.nombrePresentacion,
            fechaPresentacion: datos.fechaPresentacion
        },
        estudiantes: datos.estudiantes,
        profesores: datos.profesores,
        hour: datos.hora
    },
    {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then ((response) => {
      if (response.status === 200) {
        setActiveStep(activeStep + 1)
        setErrorbd(false);
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
    })
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      if(datos.profesores.length === 0){
          setFailProfesor(true)
          return;
      }
      console.log("Todo listo para registrar")
      savePresentacion();
    }
    else{
      if (activeStep + 1 === 1){
        if (datos.nombrePresentacion ==="" || datos.fechaPresentacion === "" || datos.hora === "") {
          setIsFail(true)
          return;
        }
      }
      if(activeStep + 1 === 2){
        if(datos.estudiantes.length === 0){
            setFailEstudiante(true)
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
            Registro de Leccion
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
                <Typography variant="h4"> Lección registrada exitosamente </Typography>

                <Typography sx={{mb:2}}> Los siguientes datos fueron registrados: </Typography>
          
                <Typography variant="h5" component="div"> {datos.nombreLeccionpriv} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Nombre de la lección </Typography>

                <Typography variant="h5" component="div"> {datos.fechaLeccionpriv} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Fecha </Typography>

                <Typography variant="h5" component="div"> {datos.hora} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Hora </Typography>

                <Grid container>
                  <LinkButton
                    link = '/lecciones'
                    buttonText = "Lecciones"
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

                <Collapse in={failEstudiante}>
                  <Alert
                    action={
                      <IconButton aria-label="close" color="inherit" size="small"
                        onClick={() => {
                          setFailEstudiante(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    severity="error">ERROR: Selecciona al menos un estudiante
                  </Alert>
                </Collapse>

                <Collapse in={failProfesor}>
                  <Alert
                    action={
                      <IconButton aria-label="close" color="inherit" size="small"
                        onClick={() => {
                          setFailProfesor(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    severity="error">ERROR: Selecciona al menos un profesor
                  </Alert>
                </Collapse>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1, color: "#03506F" }}>
                      Retroceder
                    </Button>
                  )}
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
        <Typography>
            {datos.nombrePresentacion} | {datos.fechaPresentacion} | {datos.hora}| {datosEstudiantes.idEstudiante}, {datosEstudiantes.asistio} |
        </Typography>
      </Container>
    </ThemeProvider>
  );
}