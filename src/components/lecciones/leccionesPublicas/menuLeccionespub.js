import React from "react";
import { Grid } from "@mui/material";
import Cards from "../../Card";

export default function MenuLeccionesPub() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/list.jpg"
                    imgText = "Public lessons"
                    Title = "Lista de lecciones"
                    link = "/lecciones-publicas/lista"
                    altura = "50"
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/add.png"
                    imgText = "Public lessons 2"
                    Title = "Registro de leccion"
                    link = "/lecciones-publicas/registro"
                    altura = "50"
                />
            </Grid>
        </Grid>
    );
}