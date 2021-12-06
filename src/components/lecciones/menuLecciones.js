import React from "react";
import { Grid } from "@mui/material";
import Cards from "../Card";

export default function MenuLecciones() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Public lessons"
                    Title = "Lecciones públicas"
                    Description = "Gestión de lecciones públicas"
                    link = "/lecciones-publicas"
                />
            </Grid>

            <Grid item>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Private lessons"
                    Title = "Lecciones privadas"
                    Description = "Gestión de lecciones privadas"
                    link = "/lecciones-privadas"
                />
            </Grid>
        </Grid>
    );
}