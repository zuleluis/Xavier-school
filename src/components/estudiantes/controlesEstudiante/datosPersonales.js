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
    props.datos.formSubmitted=true,
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
            variant="outlined"
            name = "nombreEst"
            error={props.datos.nombreEst === "" && props.isFail}
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
            variant="outlined"
            name = "apellidoEst"
            error={props.datos.apellidoEst === "" && props.isFail}
            defaultValue={props.datos.apellidoEst}
            onChange={handleInputText}
          />
        </Grid>

        <Grid container spacing={3} margin={1} justifyContent="space-between">
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="fechaNacimiento"
              label="Fecha de nacimiento" 
              type="date"
              variant="outlined"
              name="fechaEst"
              defaultValue={props.datos.fechaEst}
              error={props.datos.fechaEst === "" && props.isFail}
              onChange={handleInputText}
              InputLabelProps={{shrink: true}}
              fullWidth
            />
          </Grid>
          <Grid item>
            <FormControl sx={{minWidth: 80 }} item xs={12} sm={5}>
              <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="nivel"
                label="Nivel"
                name="nivelEst"
                defaultValue={props.datos.nivelEst}
                onChange={handleInputText}
                error={props.datos.nivelEst === "" && props.isFail}
                fullWidth
              >
                {niveles.map(n => {return (<MenuItem value={n.idNivel}>{n.nombreNivel}</MenuItem>)})}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              id="nssEstudiante"
              label="NSS"
              name="nssEst"
              variant="outlined"
              defaultValue={props.datos.nssEst}
              onChange={handleInputText}
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}