import React, { useState, useEffect } from 'react'  
import { useParams } from 'react-router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Redirect, useLocation } from 'react-router-dom';
import LinkButton from '../linkButton';
import axios from 'axios';

export default function DetallesPresentacion() {
    const {idPresentacion} = useParams();
    const [presentacion, setPresentacion] = useState([])
    const [estudiantes, setEstudiantes] = useState([])
    const [profesores, setProfesores] = useState([])
    const [errorbd, setErrorbd] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const location = useLocation();

    useEffect(() => {
      axios.get(`http://localhost:5000/api/presentaciones/${idPresentacion}`, {
        headers : {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then (
        (response) => {
          if (response.status === 200) {
            setPresentacion(response.data);
            setErrorbd(false);
          }
        },
        (error) => {
          //console.log(error.response.status)
          if(!error.response) setErrorbd(true);
          else{
            if (error.response.status === 401) {
              localStorage.removeItem("ACCESS_TOKEN");
              setToken('');
              setErrorbd(false);
            }
          }
        }
      );
    },[])

    useEffect(() => {
      axios.get(`http://localhost:5000/api/presentaciones/estuds/${idPresentacion}`, {
        headers : {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then (
        (response) => {
          if (response.status === 200) {
            setEstudiantes(response.data);
          }
        },
        (error) => {
          //console.log(error.response.status)
          if(!error.response) setErrorbd(true);
          else{
            if (error.response.status === 401) {
              localStorage.removeItem("ACCESS_TOKEN");
              setToken('');
            }
          }
        }
      );
    },[])
    
    useEffect(() => {
      axios.get(`http://localhost:5000/api/presentaciones/profes/${idPresentacion}`, {
        headers : {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then (
        (response) => {
          if (response.status === 200) {
            setProfesores(response.data);
          }
        },
        (error) => {
          if(!error.response) setErrorbd(true);
          else{
          //console.log(error.response.status)
            if (error.response.status === 401) {
              localStorage.removeItem("ACCESS_TOKEN");
              setToken('');
              setErrorbd(false);
            }
          }
        }
      );
    },[])

    const dateFormatter = (date) => {
      if(date){
        return date.split(['T'],[1])
      }
    }

    if(errorbd) return <Redirect to='/error'/>;
    if(!token){
      return(
        <Redirect to={
          {
            pathname:'/login',
            state:{
              from: location
            }
          }
        }/>
      )
    }

    return (
        <div>
            <Grid container justifyContent="flex-end">
              <LinkButton
                link = '/presentaciones'
                buttonText = "Presentaciones"
                buttonColor = "#03506F"
                size="small"
              />

              <LinkButton
                link = '/'
                buttonText = "Inicio"
                buttonColor = "#03506F"
                size="small"
              />
            </Grid>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {presentacion.nombrePresentacion}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom>
                  Nombre
                </Typography>

                <Typography variant="h5" component="div">
                  {dateFormatter(presentacion.fechaPresentacion)}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Fecha
                </Typography>

                <Typography variant="h5" component="div">
                  {presentacion.horaPresentacion}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom>
                  Hora
                </Typography>
              
              </CardContent>
            </Card>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#0A043C"}}
                >
                    <Typography sx={{color: "white"}}>Estudiantes</Typography>
                </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Card sx={{margin: 1, boxShadow: 3, backgroundColor: "#03506F", color:"white"}}>
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Estatus de participación</TableCell>
                          </TableRow>
                        </TableHead>
                          <TableBody>
                            {estudiantes.map((row) => (
                              <TableRow
                                key={row.estudiante.idEstudiante}>
                                <TableCell component="th" scope="row"> {row.estudiante.nombreEstudiante} {row.estudiante.apellidoEstudiante}</TableCell>
                                <TableCell component="th" scope="row"> {(row.estadoPresentacion) === 1 ? "Participó" : "--"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#0A043C"}}
                >
                    <Typography sx={{color: "white"}}>Profesores</Typography>
                </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Card sx={{margin: 1, boxShadow: 3, backgroundColor: "#03506F", color:"white"}}>
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                          </TableRow>
                        </TableHead>
                          <TableBody>
                            {profesores.map((row) => (
                              <TableRow
                                key={row.idProfesor}>
                                <TableCell component="th" scope="row"> {row.nombreProfesor}</TableCell>
                                <TableCell component="th" scope="row"> {row.apellidoProfesor}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Typography>
             </AccordionDetails>
            </Accordion>
      </div>
    );
}