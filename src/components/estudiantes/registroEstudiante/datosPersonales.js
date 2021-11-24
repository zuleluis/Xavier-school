import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';

export default function DatosPersonales(props) {

  const handleInputText = (event) => {
    props.setDatos({
      ...props.datos,
      [event.target.name] : event.target.value
    });
  }

  const [niveles, setNiveles] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/niveles/all", {
      headers : {
        'Content-type': 'application/json'
      }
    }).then (
      (response) => {
        if (response.status === 200) {
          setNiveles(response.data);
        }
      },
      (error) => {
        console.log("Ni pex, ya valiste pa...")
      }
    );
  },[])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos Personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombreEstudiante"
            label="Nombre"
            fullWidth
            variant="standard"
            name = "nombreEst"
            defaultValue={props.datos.nombreEst}
            onChange={handleInputText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellidoEstudiante"
            label="Apellido"
            fullWidth
            variant="standard"
            name = "apellidoEst"
            defaultValue={props.datos.apellidoEst}
            onChange={handleInputText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fechaNacimiento"
            label="Fecha de nacimiento" 
            type="date"
            variant="standard"
            name="fechaEst"
            defaultValue={props.datos.fechaEst}
            onChange={handleInputText}
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="nivel"
              label="Nivel"
              name="nivelEst"
              defaultValue={props.datos.nivelEst}
              onChange={handleInputText}
            >
              {niveles.map(n => {return (<MenuItem value={n.idNivel}>{n.nombreNivel}</MenuItem>)})}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} >
          <TextField
            id="nssEstudiante"
            label="NSS"
            name="nssEst"
            variant="standard"
            defaultValue={props.datos.nssEst}
            onChange={handleInputText}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}