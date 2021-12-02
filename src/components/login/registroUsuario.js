import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core'
import Select from '@mui/material/Select';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
	logo: {
		height: 150,
	}
  }));


export default function Registro() {
  const classes = useStyles();
  const [values, setValues] = useState({
    correo : "",
    nombreUsuario : "",
    apellidoUsuario : "",
    password : "",
    estadoAdministrador : "",
  });
  const [errorbd, setErrorbd] = useState(false)

  const handleChange = e => {
		const {name, value} = e.target;
		setValues({
		...values,
		[name] : value
		})
	};	
  
  const doSave = () => {
    axios.post ("http://localhost:5000/api/usuarios/save", 
    {
      "correo" : values.correo,
      "nombreUsuario" : values.nombreUsuario,
      "apellidoUsuario" : values.apellidoUsuario,
      "password" : values.password,
      "estadoAdministrador" : values.estadoAdministrador,
    },
    {
      headers : {
        'Content-type': 'application/json'
      }
    }).then (
			(response) => {
			  if (response.status === 200) {
          setErrorbd(false);
				}
			},
			(error) => {
				if(!error.response) setErrorbd(true);
        else setErrorbd(false);
			}
		);
  }

  if(errorbd) return <Redirect to='/error'/>;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="media/logo.png" alt="logo" className={classes.logo}/>
          <Typography component="h1" variant="h5" sx={{mb:3}}>
            Registrarse
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombreUsuario"
                required
                fullWidth
                id="nombreUsuario"
                label="Nombre"
                autoFocus
                onChange={handleChange}
					      value={values.nombreUsuario}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellidoUsuario"
                label="Apellido"
                name="apellidoUsuario"
                autoComplete="family-name"
                onChange={handleChange}
					      value={values.apellidoUsuario}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="correo"
                label="Correo electrónico"
                name="correo"
                autoComplete="email"
                onChange={handleChange}
					      value={values.correo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
					      value={values.password}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="label">Tipo de usuario</InputLabel>
                <Select
                  name="estadoAdministrador"
                  label="Tipo de usuario"
                  labelId="label"
                  id="estadoAdministrador"
                  value={values.estadoAdministrador}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Usuario estándar</MenuItem>
                  <MenuItem value={1}>Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3, backgroundColor: "#03506F" }}
            onClick={doSave}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            <Link to='/login' style={{color: "#03506F", textDecoration:'none', fontSize:14}}>
              {"¿Ya tienes una cuenta? Inicia sesión"}
            </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}