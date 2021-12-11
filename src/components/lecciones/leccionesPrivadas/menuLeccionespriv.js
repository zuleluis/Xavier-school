import React from "react";
import { Grid } from "@mui/material";
import Cards from "../../Card";

export default function MenuLeccionesPriv() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/list.jpg"
                    imgText = "Private lessons"
                    Title = "Lista de lecciones"
                    link = "/lecciones-privadas/lista"
                    altura = "50"
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/add.png"
                    imgText = "Private lessons 2"
                    Title = "Registro de leccion"
                    link = "/lecciones-privadas/registro"
                    altura = "50"
                />
            </Grid>
        </Grid>
    );
}