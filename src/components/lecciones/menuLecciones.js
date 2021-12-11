import React from "react";
import { Grid } from "@mui/material";
import Cards from "../Card";

export default function MenuLecciones() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item md={4} >
                <Cards
                    imgPath = "media/public-lesson.jpg"
                    imgText = "Public lessons"
                    Title = "Lecciones públicas"
                    link = "/lecciones-publicas"
                    altura = "300"
                />
            </Grid>

            <Grid item md={4}>
                <Cards
                    imgPath = "media/private-lesson.jpg"
                    imgText = "Private lessons"
                    Title = "Lecciones privadas"
                    link = "/lecciones-privadas"
                    altura = "300"
                />
            </Grid>
        </Grid>
    );
}