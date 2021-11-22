import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function DatosPersonales() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="nombreEstudiante"
          label="Nombre"
        />
        <TextField
          required
          id="apellidoEstudiante"
          label="Apellido"
        />
        <TextField
          required
          id="fechaNacimiento"
          label="Fecha de nacimiento" 
          type="date"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />
        <TextField
          id="nssEstudiante"
          label="NSS"
        />
      </div>
    </Box>
  );
}