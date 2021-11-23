import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function DatosPersonales() {
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellidoEstudiante"
            label="Apellido"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="fechaNacimiento"
            label="Fecha de nacimiento" 
            type="date"
            variant="standard"
            InputLabelProps={{shrink: true}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="nssEstudiante"
            label="NSS"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}