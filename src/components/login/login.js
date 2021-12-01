import axios from "axios";
import { useState } from 'react';
import { useLocation, useHistory } from "react-router";

import { 
	Form,
	Alert, 
	FormGroup,
	Label, 
	Input, 
	Button 
} from "reactstrap";

const Login = (props) => {
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
		<div>
				<Alert
					isOpen={values.error}
					color="danger"
					toggle={() => {setValues ({
						...values,
						error: false
					})}}
				>
					User or Password Incorrect!
				</Alert>
				<div className="Login">
					<Form>
						<FormGroup>
							<Label>Usuario</Label>
							<Input name="username" type="text" onChange={handleChange} value={values.username} />
						</FormGroup>
						<FormGroup>
							<Label>Contraseña</Label>
							<Input type="password" name="password" onChange={handleChange} value={values.password} />
						</FormGroup>
						<Button block type="button" onClick={doLogin}>
							login
						</Button>
					</Form>
				</div>
			</div>
	);
}


export default Login;


/*
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core'

import axios from "axios";
import { useState } from 'react';
import { useLocation, useHistory } from "react-router";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
	logo: {
		height: 150,
		marginRight: theme.spacing(2),
	}
  }));

export default function Login() {
  	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();
	const [values, setValues] = useState({
		username: '',
		password: '',
		error: false,
		prev: location.state.from.pathname
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
			history.push(values.prev)
			//console.log(json.token)
			console.log("Ubicacion: " + values.prev)
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

			<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
			/>
			
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</Button>
			<Grid container>
				<Grid item>
				<Link href="#" variant="body2">
					{"¿No tienes una cuenta? Regístrate"}
				</Link>
				</Grid>
			</Grid>
			</Box>
		</Container>
		</ThemeProvider>
	);
}
*/