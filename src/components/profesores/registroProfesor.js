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
import { TextField } from '@mui/material';

const steps = ['Datos personales', 'Finalizar'];

const theme = createTheme();

export default function RegistroProfesor() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorbd, setErrorbd] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [datos, setDatos] = useState({
    nombreProfesor : "",
    apellidoProfesor : "",
    fechaNacimientopr : "",
    nssProfesor : "",
  });

  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();

  const handleChange = e => {
		const {name, value} = e.target;
		setDatos({
		...datos,
		[name] : value
		})
	};

  const saveProfesor = () => {
    axios.post ("http://localhost:5000/api/profesores/save", {
        nombreProfesor: datos.nombreProfesor,
        apellidoProfesor: datos.apellidoProfesor,
        fechaNacimientopr: datos.fechaNacimientopr,
        nssProfesor: datos.nssProfesor,
        activoOInactivo: 1,
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
    /*if (activeStep + 1 === steps.length -1 && isFail === false) {
      saveProfesor();
    }
    else{
      if (activeStep + 1 === 1){
        if (datos.nombreProfesor==="" || datos.apellidoProfesor=== "" || datos.fechaNacimientopr ==="") {
          setIsFail(true)
          console.log(isFail)
          return;
        }
        //else setActiveStep(activeStep + 1);
      }
    }*/
    if (activeStep + 1 === steps.length - 1){
      if (datos.nombreProfesor==="" || datos.apellidoProfesor=== "" || datos.fechaNacimientopr ==="") {
        setIsFail(true)
        return;
      }
      else saveProfesor();
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
            {activeStep === steps.length -1 ? (
              <Fragment>
                <Typography variant="h4"> Profesor registrado exitosamente </Typography>

                <Typography sx={{mb:2}}> Los siguientes datos fueron registrados: </Typography>
          
                <Typography variant="h5" component="div"> {datos.nombreProfesor} {datos.apellidoProfesor} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Nombre </Typography>

                <Typography variant="h5" component="div"> {datos.fechaNacimientopr} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Fecha de Nacimiento </Typography>

                <Typography variant="h5" component="div"> {datos.nssProfesor === '' ? "--" : datos.nssProfesor} </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom> Número de Seguridad Social </Typography>

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
                <Fragment>
                  <Typography variant="h6" gutterBottom>
                    Datos Personales
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="nombreProfesor"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        name = "nombreProfesor"
                        error={datos.nombreProfesor === "" && isFail}
                        defaultValue={datos.nombreProfesor}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="apellidoProfesor"
                        label="Apellido"
                        fullWidth
                        variant="outlined"
                        name = "apellidoProfesor"
                        error={datos.apellidoProfesor === "" && isFail}
                        defaultValue={datos.apellidoProfesor}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid container spacing={3} margin={1} justifyContent="space-between">
                      <Grid item xs={12} sm={5}>
                        <TextField
                          required
                          id="fechaNacimientopr"
                          label="Fecha de nacimiento" 
                          type="date"
                          variant="outlined"
                          name="fechaNacimientopr"
                          defaultValue={datos.fechaNacimientopr}
                          error={datos.fechaNacimientopr === "" && isFail}
                          onChange={handleChange}
                          InputLabelProps={{shrink: true}}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} sm={5}>
                        <TextField
                          id="nssProfesor"
                          label="NSS"
                          name="nssProfesor"
                          variant="outlined"
                          defaultValue={datos.nssProfesor}
                          onChange={handleChange}
                          fullWidth
                          inputProps={{ maxLength: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Fragment>

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