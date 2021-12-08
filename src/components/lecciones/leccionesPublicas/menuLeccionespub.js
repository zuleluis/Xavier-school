import React from "react";
import { Grid } from "@mui/material";
import Cards from "../../Card";

export default function MenuLeccionesPub() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Public lessons"
                    Title = "Lista de lecciones"
                    Description = "Shalala"
                    link = "/lecciones-publicas/lista"
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Public lessons 2"
                    Title = "Registro de leccion"
                    Description = "La neta ya estoy harta :l"
                    link = "/lecciones-publicas/registro"
                />
            </Grid>
        </Grid>
    );
}