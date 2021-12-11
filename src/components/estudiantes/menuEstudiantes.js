import React from "react";
import ExtendedCard from "../ExtendedCard";
import useStyles from "../../styles/Styles";

export default function MenuEstudiantes() {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <ExtendedCard
            imgPath = "media/list.jpg"
            imgText = "Student's list"
            Title = "Lista de estudiantes"
            link = "/estudiantes/lista"
            />
            <ExtendedCard
                imgPath = "media/add.png"
                imgText = "Add student"
                Title = "Registro de estudiante"
                link = "/estudiantes/registro"
            />
            <ExtendedCard
                imgPath = "media/edit.jpg"
                imgText = "Modify student"
                Title = "Editar datos de estudiante"
                link = "/estudiantes/editar"
            />
        </div>
    );
    
}