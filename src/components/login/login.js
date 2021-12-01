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