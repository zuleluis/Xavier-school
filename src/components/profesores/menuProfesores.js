import React from "react";
import ExtendedCard from "../ExtendedCard";
import useStyles from "../../styles/Styles";

export default function MenuProfesores() {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <ExtendedCard
              imgPath = "media/list.jpg"
              imgText = "Teacher's list"
              Title = "Lista de profesores"
              link = "/profesores/lista"
            />
            <ExtendedCard
              imgPath = "media/add.png"
              imgText = "Add teacher"
              Title = "Registro de profesor"
              link = "/profesores/registro"
            />
            <ExtendedCard
              imgPath = "media/edit.jpg"
              imgText = "Modify teacher"
              Title = "Editar datos de profesor"
              link = "/profesores/editar"
            />
        </div>
    );
    
}