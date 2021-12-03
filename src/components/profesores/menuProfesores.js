import React from "react";
import ExtendedCard from "../ExtendedCard";
import useStyles from "../../styles/Styles";

export default function MenuProfesores() {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <ExtendedCard
            imgPath = "media/students.jpg"
            imgText = "Teacher's list"
            Title = "Lista de profesores"
            Description = "Blablabla"
            link = "/profesores/lista"
            />
            <ExtendedCard
                imgPath = "media/teachers.jpg"
                imgText = "Add teacher"
                Title = "Registro de profesor"
                Description = "Otro blablabla chido de los que se avienta Zule"
                link = "/profesores/registro"
            />
            <ExtendedCard
                imgPath = "media/lessons.jpg"
                imgText = "Modify teacher"
                Title = "Editar datos de profesor"
                Description = "Un blablabla pero este de Saul :v"
                link = "/profesores/editar"
            />
        </div>
    );
    
}