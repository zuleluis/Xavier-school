import axios from "axios";
import { useState } from 'react';
import { Location } from 'history';

import { 
	Form,
	Alert, 
	FormGroup,
	Label, 
	Input, 
	Button 
} from "reactstrap";

const Login = (props) => {
	
	const [correo, setCorreo] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	//const [prev, setPrev] = useState(props.location.state.from.pathname)

	const doLogin = () => {
		axios.post ('http://localhost:5000/api/usuarios/autenticar',
			{
				"correo": correo,
				"password": password,
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
					//props.history.push (prev);
					//console.log(json.token)
				}
			},
			(error) => {
				if (error.response.status === 400) {
					/*guardarEstado (prevState =>
						{
							return (
								{
									...prevState,
									error: true
								}	
							)
						}
					);*/
				}
				console.log("Exception " + error);
			}
		);
	}

	/*
	const handleChange = (e) => {
		const name = e.target.name;
		const val = e.target.value;

		guardarEstado (prevState =>
			{
				return (
					{
						...prevState,
						[name]: val
					}
				);
			}
		);
	}*/

	return (
		<div>
				<Alert
					isOpen={error}
					color="danger"
					//toggle={() => {guardarEstado ( prevState => { return ( {...prevState, error: false} )})}}
				>
					User or Password Incorrect!
				</Alert>
				<div className="Login">
					<Form>
						<FormGroup>
							<Label>Usuario</Label>
							<Input name="correo" type="text" onChange={(e) => setCorreo(e.target.value)} value={correo} />
						</FormGroup>
						<FormGroup>
							<Label>Contraseña</Label>
							<Input type="password" name="Password" onChange={e => setPassword(e.target.value)} value={password} />
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