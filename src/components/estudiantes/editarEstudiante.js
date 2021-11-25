import React, { useState, useEffect } from 'react'  
import { useParams } from 'react-router';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosPersonales from './controlesEstudiante/datosPersonales';
import DatosPoderes from './controlesEstudiante/datosPoderes';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


const steps = ['Datos personales', 'Registro de poderes'];

const theme = createTheme();

export default function RegistroEstudiante() {
  const {idEstudiante} = useParams();
  const [estudiante, setEstudiante] = useState([{user: null}])
  const [datos, setDatos] = React.useState({
    nombreEst : "",
    apellidoEst : "",
    nssEst : "",
    fechaEst : "",
    nivelEst : "",
    poderes : []
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/estudiantes/${idEstudiante}&1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {setEstudiante(data)})
    .catch((err) => {
      console.log(err);
    });
  },[]);


  const updateEstudiante = () => {
    var bool;
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
        bool = true;
      }
    }, (error) => {
      console.log(error);
      bool = false;
    })
    return bool;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Actualizar estudiante
          </Typography>
          
          <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          />

          <Button variant="contained" /*onClick={}*/ sx={{backgroundColor: "#03506F", color:"white"}}>
            Buscar Estudiante
          </Button>

          <DatosPersonales setDatos={setDatos} datos={datos}/>
          <DatosPoderes setDatos={setDatos} datos={datos}/>
        </Paper>
        <Typography>{datos.nombreEst} | {datos.apellidoEst} | {datos.fechaEst} | {datos.nssEst} | {datos.poderes} | {datos.nivelEst}</Typography>
      </Container>
    </ThemeProvider>
  );
}