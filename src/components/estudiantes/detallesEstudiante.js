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

export default function DetallesEstudiante() {
    const {idEstudiante} = useParams();

    const [estudiante, setEstudiante] = useState([{user: null}])
    const [poderes, setPoderes] = useState([])
    const [leccionespriv, setLeccionesPriv] = useState([{user: null}])
    const [leccionespub, setLeccionesPub] = useState([{user: null}])
    const [presentaciones, setPresentaciones] = useState([{user: null}])


    useEffect(() => {
        fetch(`http://localhost:5000/api/estudiantes/${idEstudiante}&1`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {setEstudiante(data)})
        .catch((err) => {
          console.log(err);
        });
    },[]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/estudiantes/poderes/${idEstudiante}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {setPoderes(data)})
      .catch((err) => {
        console.log(err);
      });
    },[]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/estudiantes/poderes/${idEstudiante}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {setPoderes(data)})
      .catch((err) => {
        console.log(err);
      });
    },[]);

    const dateFormatter = (date) => {
      if(date){
        return date.split(['T'],[1])
      }
    }

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nombre del Estudiante
                </Typography>
                <Typography variant="h5" component="div">
                  {estudiante.nombreEstudiante} {estudiante.apellidoEstudiante}
                </Typography>

                <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
                  Fecha de Nacimiento
                </Typography>
                <Typography variant="h5" component="div">
                  {dateFormatter(estudiante.fechaNacimiento)}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Numero de Seguridad Social
                </Typography>
                <Typography variant="h5" component="div">
                  {estudiante.nssEstudiante}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nivel de Poder
                </Typography>
                <Typography variant="h5" component="div">
                  {estudiante.nivelpoder}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Estatus
                </Typography>
                <Typography variant="h5" component="div">
                  {estudiante.activoOInactivo === 1 ? "Activo" : "Inactivo"}
                </Typography>
              
              </CardContent>
            </Card>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Datos de poderes</Typography>
                </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Poderes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {poderes.map((row) => (
                        <TableRow
                          key={row.idPoder}>
                          <TableCell component="th" scope="row">
                            {row.nombrePoder}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Lecciones tomadas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Card sx={{margin: 1, boxShadow: 3}}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Lecciones privadas
                        </Typography>
                      </CardContent>
                    </Card>
                  
                    <Card sx={{margin: 1, boxShadow: 3}}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Lecciones públicas
                        </Typography>
                      </CardContent>
                    </Card>
                </Grid>
            </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Presentaciones</Typography>
                </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Aqui deben de ir las presentaciones a las que asistió y si participó o no
                </Typography>
            </AccordionDetails>
            </Accordion>
      </div>
    );
}

/*
import * as React from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
*/