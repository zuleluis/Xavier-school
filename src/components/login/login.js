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
import axios from "axios";
import { useState } from 'react';
import { useLocation, useHistory } from "react-router";
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
	logo: {
		height: 150,
	}
  }));

export default function Login(props) {
  	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();
	const [values, setValues] = useState({
		username: '',
		password: '',
		error: false,
		//prev: location.state.from.pathname
	});

  	const doLogin = () => {
		axios.post ('http://localhost:5000/api/usuarios/autenticar',
		{
			"correo": values.username,
			"password": values.password,
		},
		{
			headers: {
			'Content-type': 'application/json'
			}
		}).then (
			(response) => {
			if (response.status === 200) {
				const json = response.data;
					localStorage.setItem("ACCESS_TOKEN", json.token);
					if(location.state === undefined) history.push('/')
					else history.push(location.state.from.pathname)
					//history.push(values.prev)
					//console.log(json.token)
					//console.log("Ubicacion: " + values.prev)
				}
			},
			(error) => {
				if (error.response.status === 400) {
					setValues ({
						...values,
						error: true
					});
				}
				console.log("Exception " + error);
			}
		);
    }

	const handleChange = e => {
		const {name, value} = e.target;
		setValues({
		...values,
		[name] : value
		})
	};	

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				>
				<img src="media/logo.png" alt="logo" className={classes.logo}/>
				<Typography component="h1" variant="h5">
					Iniciar Sesión
				</Typography>

				<Collapse in={values.error}>
                  <Alert
                    action={
                      <IconButton aria-label="close" color="inherit" size="small"
                        onClick={() => {
                          setValues({
							  ...values,
							  error: false
						  });
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    severity="error"> Correo electrónico o contraseña incorrectos
                  </Alert>
                </Collapse>

				<TextField
					margin="normal"
					required
					fullWidth
					id="username"
					label="Correo electrónico"
					name="username"
					autoComplete="email"
					autoFocus
					onChange={handleChange}
					value={values.username}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Contraseña"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={handleChange}
					value={values.password}
				/>
				
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 3, backgroundColor: "#03506F" }}
					onClick={doLogin}
				>
					Iniciar sesión
				</Button>
				<Grid container>
					<Grid item>
					<Link to='/signup' style={{color: "#03506F", textDecoration:'none', fontSize:14}}>
						{"¿No tienes una cuenta? Regístrate"}
					</Link>
					</Grid>
				</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
}