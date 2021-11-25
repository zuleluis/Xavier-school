import React, { useState } from 'react'  
//import Grid from '@mui/material/Grid';
//import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import axios from 'axios';
import { Container, FormGroup, Button, Input, Form, Label, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

export default function RegistroPoder (props){
    const [poder, setPoder] = useState('');
    const [errorbd, setErrorbd] = useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const add = () => {
        axios.post ("http://localhost:5000/api/poderes/save", poder,{
          headers: {
            'Content-type': "application/json",
          }
        })
        .then((response) => {
          if (response.status === 200) {
            setPoder('')
            props.setRefresh(true)
          };
          setErrorbd(false);
        },
        (error) => {
          console.log(error);
          setErrorbd(true);
        });
    }

    if(errorbd) return <Redirect to='/error'/>;

    return(
        <Box mt={4}>
            <Typography mb={2}>
                Si no encuentra los poderes del estudiante, favor de registrarlos abajo
            </Typography>


            <Accordion sx={{boxShadow:'none'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ width:200, backgroundColor: "#03506F", color:"white"}}
                >
                <Typography sx={{color: "white"}}>Registrar poder</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container className="App">
                        <h4 className="PageHeading">Ingresa el poder</h4>
                        <Form className="form">
                        <   Col>
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
                
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

/*
      
*/