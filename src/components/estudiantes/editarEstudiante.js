import React, { useState} from 'react'  
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosPersonales from './controlesEstudiante/datosPersonales';
import DatosPoderes from './controlesEstudiante/datosPoderes';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Redirect, useLocation } from 'react-router-dom';

const theme = createTheme();

export default function RegistroEstudiante() {
  const [idEstu, setIdEstu] = useState(0)
  const [pinta, setPinta] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [disabledSwitch, setDisabledSwitch] = useState(true)
  const [defaultChecked, setDefaultChecked] = useState(false)
  const [failPoderes, setFailPoderes] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [open, setOpen] = useState(false)
  const [errorbd, setErrorbd] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();
  
  const [datos, setDatos] = useState({
    nombreEst : "",
    apellidoEst : "",
    nssEst : "",
    fechaEst : "",
    nivelEst : "",
    poderes : [],
    activo : -1
  });


  const setValues = (data, data2) => {
    var fecha = data.fechaNacimiento.substring(0, data.fechaNacimiento.indexOf("T"));
    setDatos({
      nombreEst : data.nombreEstudiante,
      apellidoEst : data.apellidoEstudiante,
      fechaEst : fecha,
      nivelEst : data.fkNivelpoderEst, 
      nssEst : data.nssEst,
      poderes : data2.map(p => p.idPoder),
      activo : data.activoOInactivo
    });
    setDefaultChecked(data.activoOInactivo === 1)
    setPinta(true);
    setShowForm(true)
  }
  const buscaEstudiante = () => {
    setPinta(false);
    axios.get(`http://localhost:5000/api/estudiantes/${idEstu}&0`, {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        axios.get(`http://localhost:5000/api/estudiantes/poderes/${idEstu}`, {
          headers : {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((response1) => {
          if (response1.status === 200) {
            setValues(response.data, response1.data);
            setDisabledSwitch(false);
          }
        }, (error1) => {
          console.log(error1)
        })
        setErrorbd(false);
      }

    }, (error) => {
      if(!error.response) setErrorbd(true);
      else{
        if (error.response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
          setToken('');
          setErrorbd(false);
        }
        if(error.response.status === 400){
          setShowForm(false)
        }
      }
    });
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

  function data() {
    if (pinta) {
      return(
        <Container align="justify">
          <Grid sx={{mt:4, mb: 4}}>
            <Typography>
              Estatus del estudiante
            </Typography>

            <Typography> Inactivo
              <Switch  checked={defaultChecked}/> 
              Activo
            </Typography>

            <Button
              variant="contained"
              onClick={handleBajaAlta}
              size="small "
              sx={{backgroundColor: "#03506F", color:"white"}}
            >
              {defaultChecked ? "Dar de baja" : "Reactivar"}
            </Button>
          </Grid>

          <Grid sx={{mb:3}}>
            <DatosPersonales
              setDatos={setDatos}
              datos={datos}
              setIsFail={setIsFail}
              isFail={isFail}
            />
          </Grid>

          <Grid>
            <DatosPoderes
              setDatos={setDatos}
              datos={datos}
            />
          </Grid>

          <Grid sx={{mt:2, mb:2}}>
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
                severity="error">ERROR: Selecciona al menos un poder</Alert>
            </Collapse>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={verificaAndRegistra}
              sx={{backgroundColor: "#03506F", color:"white"}}
            >
              Guardar cambios
            </Button>
          </Grid>

          <Snackbar size="medium" open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Estudiante actualizado
            </Alert>
          </Snackbar>
        </Container>
      );
    }
    else{
      if(showForm === false){
        return(
          <Container sx={{mt:3}}>
            <Typography variant="h6">
              El estudiante no existe.
            </Typography>
          </Container>
        );
      }
      return(
        <Container/>
      );
    }
  }


  const handleInputId = (event) => setIdEstu(event.target.value)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const updateEstudiante = () => {
    console.log(datos.activo)
    axios.post (`http://localhost:5000/api/estudiante/update/${idEstu}`, {
      estudiante:  {
        nombreEstudiante: datos.nombreEst,
        apellidoEstudiante: datos.apellidoEst,
        fechaNacimiento: datos.fechaEst,
        nssEstudiante: datos.nssEst,
        activoOInactivo: datos.activo,
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
      if (response.status === 200) {
        console.log("Yeah men");
      }
    }, (error) => {
      console.log(error);
    })
  }

  const verificaAndRegistra = () => {
    var bool = false;
    if (datos.nombreEst==="" || datos.apellidoEst=== "" || datos.fechaEst ==="" || datos.nivelEst === "") {
      setIsFail(true)
      bool = true;
    }
    if (datos.poderes.length === 0) {
      setFailPoderes(true);
    }
    if (bool)
      return;

    setOpen(true)
    updateEstudiante()
  }

  const handleBajaAlta = () => {
    if (datos.activo !== 0) {
      setDatos({
        ...datos,
        activo: 0
      })
    } else {
      setDatos({
        ...datos,
        activo: 1
      })
    }
    setDefaultChecked(datos.activo === 0)
    console.log(defaultChecked)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container align="center">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{mb: 3}}>
            Actualizar estudiante
          </Typography>
          
          <TextField
            id="outlined-required"
            label="ID del estudiante"
            onChange={handleInputId}
          />

          <Grid sx={{mt:2}}>
            <Button variant="contained" onClick={buscaEstudiante} sx={{backgroundColor: "#03506F", color:"white"}}>
              Buscar Estudiante
            </Button>
          </Grid>
          
          {data()}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}