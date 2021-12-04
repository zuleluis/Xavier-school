import React, { useState} from 'react'  
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Redirect, useLocation } from 'react-router-dom';

const theme = createTheme();

export default function EditarProfesor() {
  const [idProfesor, setIdProfesor] = useState(0)
  const [pinta, setPinta] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [disabledSwitch, setDisabledSwitch] = useState(true)
  const [defaultChecked, setDefaultChecked] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [open, setOpen] = useState(false)
  const [errorbd, setErrorbd] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();
  
  const [datos, setDatos] = useState({
    nombreProfesor : "",
    apellidoProfesor : "",
    fechaNacimientopr : "",
    nssProfesor: "",
    activoOInactivo : -1
  });


  const setValues = (data) => {
    var fecha = data.fechaNacimientopr.substring(0, data.fechaNacimientopr.indexOf("T"))
    setDatos({
        nombreProfesor : data.nombreProfesor,
        apellidoProfesor : data.apellidoProfesor,
        fechaNacimientopr : fecha,
        nssProfesor: data.nssProfesor,
        activo : data.activoOInactivo
    });
    setDefaultChecked(data.activoOInactivo === 1)
    setPinta(true);
    setShowForm(true)
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setDatos({
    ...datos,
    [name] : value
    })
  };

  const buscaProfesor = () => {
    setPinta(false);
    axios.get(`http://localhost:5000/api/profesores/${idProfesor}`, {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
        setValues(response.data);
        setDisabledSwitch(false);
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
        }
    );
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
              Estatus del profesor
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
              Profesor actualizado
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
              El profesor no existe.
            </Typography>
          </Container>
        );
      }
      return(
        <Container/>
      );
    }
  }


  const handleInputId = (event) => setIdProfesor(event.target.value)
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const updateProfesor = () => {
    axios.post (`http://localhost:5000/api/profesores/update/${idProfesor}`, {
        nombreProfesor: datos.nombreProfesor,
        apellidoProfesor: datos.apellidoProfesor,
        fechaNacimientopr: datos.fechaNacimientopr,
        nssProfesor: datos.nssProfesor,
        activoOInactivo: datos.activoOInactivo,
    },
    {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then ((response) => {
      if (response.status === 200) {
        console.log("Woo hoo");
      }
    }, (error) => {
      console.log(error);
    })
  }

  const verificaAndRegistra = () => {
    var bool = false;
    if (datos.nombreProfesor === "" || datos.apellidoProfesor === "" || datos.fechaNacimientopr ==="") {
      setIsFail(true)
      bool = true;
    }
    if (bool)
      return;

    setOpen(true)
    updateProfesor()
  }

  const handleBajaAlta = () => {
    if (datos.activoOInactivo !== 0) {
      setDatos({
        ...datos,
        activoOInactivo: 0
      })
    } else {
      setDatos({
        ...datos,
        activoOInactivo: 1
      })
    }
    setDefaultChecked(datos.activoOInactivo === 0)
    console.log(defaultChecked)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container align="center">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{mb: 3}}>
            Actualizar profesor
          </Typography>
          
          <TextField
            id="outlined-required"
            label="ID del profesor"
            onChange={handleInputId}
          />

          <Grid sx={{mt:2}}>
            <Button variant="contained" onClick={buscaProfesor} sx={{backgroundColor: "#03506F", color:"white"}}>
              Buscar Profesor
            </Button>
          </Grid>
          
          {data()}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}