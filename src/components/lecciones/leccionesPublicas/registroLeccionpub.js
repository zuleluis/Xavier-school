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
import LinkButton from '../../linkButton';
import { Grid } from '@mui/material';
import { Redirect, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import DatosEstudiantes from './controles/datosEstudiantes';
import DatosProfesores from './controles/datosProfesores';

const steps = ['Datos de la lección', 'Selección de estudiantes', 'Selección de profesor'];

const theme = createTheme();

export default function RegistroLeccionpub() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFail, setIsFail] = useState(false);
  const [errorbd, setErrorbd] = useState(false);
  const [datos, setDatos] = useState({
        nombreLeccionpub : "",
        fechaLeccionpu : "",
        FkProfesorLpub: "",
        est: [],
        hour:""
  });
  const [failEstudiantes, setFailEstudiantes] = useState(false);
  const [failProfesor, setFailProfesor] = useState(false);
  const [flag, setFlag] = useState(false);
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
                Datos de la lección
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nombreLeccionpub"
                    label="Nombre"
                    fullWidth
                    variant="outlined"
                    name = "nombreLeccionpub"
                    error= { datos.nombreLeccionpub === "" && isFail}
                    defaultValue={datos.nombreLeccionpub}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid container spacing={3} margin={1} justifyContent="space-between">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="fechaLeccionpu"
                      label="Fecha" 
                      type="date"
                      variant="outlined"
                      name="fechaLeccionpu"
                      defaultValue={datos.fechaLeccionpu}
                      error={datos.fechaLeccionpu === "" && isFail}
                      onChange={handleChange}
                      InputLabelProps={{shrink: true}}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="hour"
                      label="Hora" 
                      type="time"
                      variant="outlined"
                      name="hour"
                      defaultValue={datos.hour}
                      error={datos.hour === "" && isFail}
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
            <DatosEstudiantes setDatos={setDatos} datos={datos}/>
        );
      case 2:
          return(
              <DatosProfesores setDatos={setDatos} datos={datos} flag={flag} setFlag={setFlag} />
          )
      default:
        throw new Error('Paso desconocido');
    }
  }

  const saveLeccion = () => {
    axios.post ("http://localhost:5000/api/lecGrupo/save", {
        lec:{
            nombreLeccionpub: datos.nombreLeccionpub,
            fechaLeccionpu: datos.fechaLeccionpu
        },
        idProf: datos.FkProfesorLpub,
        est: datos.est,
        hour: datos.hour
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
      if(datos.FkProfesorLpub === ''){
          setFailProfesor(true)
          return;
      }
      console.log("Todo listo para registrar")
      saveLeccion();
    }
    else{
      if (activeStep + 1 === 1){
        if (datos.nombreLeccionpub ==="" || datos.fechaLeccionpu === "" ) {
          setIsFail(true)
          return;
        }
      }
      if(activeStep + 1 === 2){
        if(datos.est.length === 0){
            setFailEstudiantes(true)
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
          
                <Typography variant="h5" component="div"> {datos.nombreLeccionpub} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Nombre de la lección </Typography>

                <Typography variant="h5" component="div"> {datos.fechaLeccionpu} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Fecha </Typography>

                <Typography variant="h5" component="div"> {datos.hour} </Typography>
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

                <Collapse in={failEstudiantes}>
                  <Alert
                    action={
                      <IconButton aria-label="close" color="inherit" size="small"
                        onClick={() => {
                          setFailEstudiantes(false);
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
                    severity="error">ERROR: Selecciona un profesor
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
      </Container>
    </ThemeProvider>
  );
}