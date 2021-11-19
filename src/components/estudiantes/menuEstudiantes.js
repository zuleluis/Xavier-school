import React from "react";
import ExtendedCard from "../ExtendedCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    mainDiv: {
      maxWidth: 1100,
      width: "100%",
      marginBottom: theme.spacing(4)
    },
  }));

export default function MenuEstudiantes() {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <ExtendedCard
            imgPath = "media/students.jpg"
            imgText = "Student's list"
            Title = "Lista de estudiantes"
            Description = "Consulta de estudiantes"
            link = "/lista-estudiantes"
            />
            <ExtendedCard
                imgPath = "media/teachers.jpg"
                imgText = "Add student"
                Title = "Registro de estudiante"
                Description = "Aqui debe ir algo de que agregas un estudiante y asi"
                link = "nanai"
            />
            <ExtendedCard
                imgPath = "media/lessons.jpg"
                imgText = "Modify student"
                Title = "Actualizar datos de estudiante"
                Description = "Un choro de modificar estudiantes"
                link = "nelpas"
            />
            <ExtendedCard
                imgPath = "media/presentations.jpg"
                imgText = "Status student"
                Title = "Dar de baja estudiante"
                Description = "Otro choro pero pa funar a un estudiante del sistema"
                link = "naranjas"
            />
        </div>
    );
    
}