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
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import { Checkbox, Select } from '@mui/material';


const steps = ['Datos personales', 'Registro de poderes'];

const theme = createTheme();

export default function RegistroEstudiante() {
  const [idEstu, setIdEstu] = useState(0)
  const [pinta, setPinta] = useState(true);
  const [isFail, setIsFail] = useState(false);
  const [disabledSwitch, setDisabledSwitch] = useState(true);
  const [defaultChecked, setDefaultChecked] = useState(false)
  const [failPoderes, setFailPoderes] = useState(false)
  
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
    console.log(data.nssEstudiante)
    setDatos({
      nombreEst : data.nombreEstudiante,
      apellidoEst : data.apellidoEstudiante,
      fechaEst : fecha,
      nivelEst : data.fkNivelpoderEst,
      nssEst : data.nssEst,
      poderes : data2.map(p => p.idPoder),
      activo : data.activoOInactivo
    });
    setDefaultChecked(data.activoOInactivo == 1)
    setPinta(true);
  }
  const buscaEstudinate = () => {
    setPinta(false);
    axios.get(`http://localhost:5000/api/estudiantes/${idEstu}&0`, {
      headers : {
        'Content-type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        //setEstudiante(response.data);
        axios.get(`http://localhost:5000/api/estudiantes/poderes/${idEstu}`, {
          headers : {
            'Content-type': 'application/json'
          }
        }).then((response1) => {
          if (response1.status === 200) {
            //setPoderesEst(response1.data)
            setValues(response.data, response1.data);
            setDisabledSwitch(false);
          }
        }, (error1) => {
          console.log(error1)
        })
      }

    }, (error) => {
      console.log(error);
    });
  };


  function data() {
    if (pinta) {
      return <Container><DatosPersonales setDatos={setDatos} datos={datos} setIsFail={setIsFail} isFail={isFail}/>
                <DatosPoderes setDatos={setDatos} datos={datos}/></Container>;
    }
    return <Container></Container>
  }


  const handleInputId = (event) => setIdEstu(event.target.value)


  const updateEstudiante = () => {
    axios.post (`http://localhost:5000/api/estudiante/update/${idEstu}`, {
      estudiante:  {
        nombreEstudiante: datos.nombreEst,
        apellidoEstudiante: datos.apellidoEst,
        fechaNacimiento: datos.fechaEst,
        nssEstudiante: datos.nssEst,
        activoOInactivo: datos.activoOInactivo,
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
    if (datos.poderes.length == 0) {
      setFailPoderes(true);
    }
    if (bool)
      return;
    updateEstudiante();
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const handleBajaAlta = () => {
    if (datos.activoOInactivo !== 0) {
      datos.activoOInactivo = 0
    } else {
      datos.activoOInactivo = 1
    }
    setDefaultChecked(datos.activoOInactivo === 1)
    console.log(defaultChecked)
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

          onChange={handleInputId}
          />

          <Button variant="contained" onClick={buscaEstudinate} sx={{backgroundColor: "#03506F", color:"white"}}>
            Buscar Estudiante
          </Button>
          
          <Typography> Inactivo <Switch  checked={defaultChecked}/> Activo</Typography>
          <Button variant="contained" onClick={handleBajaAlta} sx={{backgroundColor: "#03506F", color:"white"}} >{defaultChecked ? "Desactivar" : "Activar"}</Button>

          {data()}
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

          <Button variant="contained" onClick={verificaAndRegistra} sx={{backgroundColor: "#03506F", color:"white"}}>
            Registrar
          </Button>
        </Paper>
        <Typography>{datos.nombreEst} | {datos.apellidoEst} | {datos.fechaEst} | {datos.nssEst} | {datos.poderes} | {datos.nivelEst} ID: {idEstu}</Typography>
      </Container>
    </ThemeProvider>
  );
}