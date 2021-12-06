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
import LinkButton from '../../linkButton';
import axios from 'axios';

export default function DetallesLeccionpub() {
    const {idLeccionpub} = useParams();
    const [leccion, setLeccion] = useState([{user: null}])
    const [estudiantes, setEstudiantes] = useState([])
    const [errorbd, setErrorbd] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const location = useLocation();

    useEffect(() => {
      axios.get(`http://localhost:5000/api/lecGrupo/${idLeccionpub}`, {
        headers : {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then (
        (response) => {
          if (response.status === 200) {
            setLeccion(response.data);
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
      axios.get(`http://localhost:5000/api/lecGrupo/estuds/${idLeccionpub}`, {
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
                link = '/lecciones'
                buttonText = "Lecciones"
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
                  {leccion.nombreLeccionpub}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom>
                  Nombre de la lección
                </Typography>

                <Typography variant="h5" component="div">
                  {dateFormatter(leccion.fechaLeccionpu)}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Fecha
                </Typography>

                <Typography variant="h5" component="div">
                  {leccion.horaLeccionpub}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Hora
                </Typography>

                <Typography variant="h5" component="div">
                  {leccion.maestroLeccionP}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Profesor
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
                <Card sx={{margin: 1, boxShadow: 3, backgroundColor: "#03506F", color:"white"}}>
                    <CardContent>
                        <Typography variant="h5" component="div" margin={2}>
                            Asistentes
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Apellido</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {estudiantes.map((row) => (
                                    <TableRow
                                    key={row.idEstudiante}>
                                    <TableCell component="th" scope="row">
                                        {row.nombreEstudiante}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.apellidoEstudiante}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
      </div>
    );
}