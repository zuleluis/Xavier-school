import {React, useState} from "react";
import Card from "./Card"
import { Grid } from "@material-ui/core";
import { Redirect, useLocation } from 'react-router-dom';

export default function Home() {
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const location = useLocation();

    if(!token){
        return(
          //console.log(location.pathname),
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


    return(
        <div>
            <Grid container spacing={2}>
                <Card
                  imgPath = "media/students.jpg"
                  imgText = "Xavier's School Studients"
                  Title = "Estudiantes"
                  link = "/estudiantes"
                  alineacion = "center"
                  altura = "150"
                />
                <Card
                  imgPath = "media/teachers.jpg"
                  imgText = "Xavier's School Teachers"
                  Title = "Profesores"
                  link = "/profesores"
                  alineacion = "center"
                  altura = "150"
                />
                <Card
                  imgPath = "media/lessons.jpg"
                  imgText = "Xavier's School Lessons"
                  Title = "Lecciones"
                  link = "/lecciones"
                  alineacion = "center"
                  altura = "150"
                />
                <Card
                  imgPath = "media/presentations.jpg"
                  imgText = "Xavier's School Presentations"
                  Title = "Presentaciones"
                  link = "/presentaciones"
                  alineacion = "center"
                  altura = "150"
                />
            </Grid>
        </div>
    );
    
}