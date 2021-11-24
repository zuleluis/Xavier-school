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
    const [presentaciones, setPresentaciones] = useState([])



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
      fetch(`http://localhost:5000/api/estudiantes/lecGrupo/${idEstudiante}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {setLeccionesPub(data)})
      .catch((err) => {
        console.log(err);
      });
    },[]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/estudiantes/lecPrivadas/${idEstudiante}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {setLeccionesPriv(data)})
      .catch((err) => {
        console.log(err);
      });
    },[]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/estudiantes/presentaciones/${idEstudiante}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {setPresentaciones(data)})
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
                <Typography variant="h5" component="div">
                  {estudiante.nombreEstudiante} {estudiante.apellidoEstudiante}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nombre del Estudiante
                </Typography>

                <Typography variant="h5" component="div">
                  {dateFormatter(estudiante.fechaNacimiento)}
                </Typography>
                <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
                  Fecha de Nacimiento
                </Typography>

                <Typography variant="h5" component="div">
                  {estudiante.nssEstudiante}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Numero de Seguridad Social
                </Typography>

                <Typography variant="h5" component="div">
                  {estudiante.nivelpoder}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nivel de Poder
                </Typography>

                <Typography variant="h5" component="div">
                  {estudiante.activoOInactivo === 1 ? "Activo" : "Inactivo"}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Estatus
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
                    <Typography sx={{color: "white"}}>Datos de poderes</Typography>
                </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{backgroundColor: "#03506F", color:"white"}}>
                        <Typography variant="h5" component="div" margin={2}>
                          Poderes
                        </Typography>
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
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#0A043C"}}
                >
                    <Typography sx={{color: "white"}}>Lecciones tomadas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Card sx={{margin: 1, boxShadow: 3, backgroundColor: "#03506F", color:"white"}}>
                      <CardContent>
                        <Typography variant="h5" component="div" margin={2}>
                          Lecciones públicas
                        </Typography>

                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Hora</TableCell>
                              <TableCell>Fecha</TableCell>
                              <TableCell>Profesor</TableCell>
                            </TableRow>
                          </TableHead>
                            <TableBody>
                              {leccionespub.map((row) => (
                                <TableRow
                                  key={row.idLeccionpub}>
                                  <TableCell component="th" scope="row"> {row.nombreLeccionpub}</TableCell>
                                  <TableCell component="th" scope="row"> {row.horaLeccionpub}</TableCell>
                                  <TableCell component="th" scope="row"> {dateFormatter(row.fechaLeccionpu)}</TableCell>
                                  <TableCell component="th" scope="row"> {row.maestroLeccionP}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </CardContent>
                    </Card>
                  
                    <Card sx={{margin: 1, boxShadow: 3, backgroundColor: "#03506F", color:"white"}}>
                      <CardContent>
                        <Typography variant="h5" component="div" margin={2}>
                          Lecciones Privadas
                        </Typography>

                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Hora</TableCell>
                              <TableCell>Fecha</TableCell>
                              <TableCell>Profesor</TableCell>
                            </TableRow>
                          </TableHead>
                            <TableBody>
                              {leccionespriv.map((row) => (
                                <TableRow
                                  key={row.idLeccionpriv}>
                                  <TableCell component="th" scope="row"> {row.nombreLeccionpriv}</TableCell>
                                  <TableCell component="th" scope="row"> {row.horaLeccionpriv}</TableCell>
                                  <TableCell component="th" scope="row"> {dateFormatter(row.fechaLeccionpriv)}</TableCell>
                                  <TableCell component="th" scope="row"> {row.profesor}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </CardContent>
                    </Card>
                </Grid>
            </AccordionDetails>
          </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#0A043C"}}
                >
                    <Typography sx={{color: "white"}}>Presentaciones</Typography>
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
                            <TableCell>Hora</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Estatus de participación</TableCell>
                          </TableRow>
                        </TableHead>
                          <TableBody>
                            {presentaciones.map((row) => (
                              <TableRow
                                key={row.estudiante.idPresentacion}>
                                <TableCell component="th" scope="row"> {row.estudiante.nombrePresentacion}</TableCell>
                                <TableCell component="th" scope="row"> {row.estudiante.horaPresentacion}</TableCell>
                                <TableCell component="th" scope="row"> {dateFormatter(row.estudiante.fechaPresentacion)}</TableCell>
                                <TableCell component="th" scope="row"> {(row.asistencia) === 1 ? "Participó" : "--"}</TableCell>
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