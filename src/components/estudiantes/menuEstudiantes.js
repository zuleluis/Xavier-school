import React from "react";
import ExtendedCard from "../ExtendedCard";
import useStyles from "../../styles/Styles";

export default function MenuEstudiantes() {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <ExtendedCard
            imgPath = "media/students.jpg"
            imgText = "Student's list"
            Title = "Lista de estudiantes"
            Description = "Consulta de estudiantes"
            link = "/estudiantes/lista"
            />
            <ExtendedCard
                imgPath = "media/teachers.jpg"
                imgText = "Add student"
                Title = "Registro de estudiante"
                Description = "Aqui debe ir algo de que agregas un estudiante y asi"
                link = "/estudiantes/registro"
            />
            <ExtendedCard
                imgPath = "media/lessons.jpg"
                imgText = "Modify student"
                Title = "Editar datos de estudiante"
                Description = "Algo de editar datos"
                link = "/estudiantes/editar"
            />
        </div>
    );
    
}