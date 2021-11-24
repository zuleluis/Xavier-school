import React, { useState } from 'react'  
//import Grid from '@mui/material/Grid';
//import TextField from '@mui/material/TextField';
//import { Button } from '@mui/material';
import axios from 'axios';
import { Container, FormGroup, Button, Input, Form, Label, Col} from 'reactstrap';

export default function RegistroPoder (props){
    const [poder, setPoder] = useState('');

    const add = () => {
        axios.post ("http://localhost:5000/api/poderes/save", 
                poder,
            {
                headers: {
                    'Content-type': "application/json",
                }
            }
        ).then (
            (response) => {
                if (response.status === 200) {
                    setPoder('')
                    props.setRefresh(true)
                };
            },
            (error) => {
                console.log(error);
            }
        );

    }

    return (
        <Container className="App">
            <h4 className="PageHeading">Ingresa el poder</h4>
            <Form className="form">
                <Col>
                    <FormGroup row>
                        <Label for="name" sm={2}>Poder</Label>
                        <Col sm={2}>
                            <Input type="text" name="nombrePoder" onChange={(e) => setPoder(e.target.value)} value={poder} />
                        </Col>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup row>
                        <Col sm={5}>
                        </Col>
                        <Col sm={1}>
                            <Button color="primary" onClick={add}>Submit</Button>
                        </Col>
                        <Col sm={1}>
                            <Button color="secondary" /*onClick={this.cancel}*/>Cancel</Button>{' '}
                        </Col>
                        <Col sm={5}>
                        </Col>
                    </FormGroup>
                </Col>
            </Form>
        </Container>
    );
}