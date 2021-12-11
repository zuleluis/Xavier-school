import React, { useState, useEffect } from 'react'  
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import { Redirect, useLocation } from 'react-router-dom';
import LinkButton from '../../linkButton';
import axios from 'axios';

export default function DetallesLeccionpriv() {
    const {idLeccionpriv} = useParams();
    const [leccion, setLeccion] = useState([{user: null}])
    const [errorbd, setErrorbd] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const location = useLocation();

    useEffect(() => {
      axios.get(`http://localhost:5000/api/lecPrivadas/${idLeccionpriv}`, {
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
                  {leccion.nombreLeccionpriv}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3 }} color="text.secondary" gutterBottom>
                  Nombre de la lección
                </Typography>

                <Typography variant="h5" component="div">
                  {dateFormatter(leccion.fechaLeccionpriv)}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Fecha
                </Typography>

                <Typography variant="h5" component="div">
                  {leccion.horaLeccionpriv}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Hora
                </Typography>

                <Typography variant="h5" component="div">
                  {leccion.profesor}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Profesor
                </Typography>

                <Typography variant="h5" component="div">
                  {leccion.estudiante}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:3}} color="text.secondary" gutterBottom>
                  Estudiante
                </Typography>
              </CardContent>
            </Card>
      </div>
    );
}