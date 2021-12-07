import React from "react";
import { Grid } from "@mui/material";
import Cards from "../../Card";

export default function MenuLeccionesPriv() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Private lessons"
                    Title = "Lista de lecciones"
                    Description = "Shalala"
                    link = "/lecciones-privadas/lista"
                />
            </Grid>

            <Grid item>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Private lessons 2"
                    Title = "Registro de leccion"
                    Description = "La neta ya estoy harta :l"
                    link = "/lecciones-privadas/registro"
                />
            </Grid>
        </Grid>
    );
}