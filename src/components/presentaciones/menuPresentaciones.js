import React from "react";
import { Grid } from "@mui/material";
import Cards from "../Card";

export default function MenuLecciones() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/students.jpg"
                    imgText = "Presentations's list"
                    Title = "Lista de presentaciones"
                    Description = "Blablabla"
                    link = "/presentaciones/lista"
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/teachers.jpg"
                    imgText = "Add presentation"
                    Title = "Registrar presentación"
                    Description = "Ñaaaaa"
                    link = "/presentaciones/registro"
                />
            </Grid>
        </Grid>
    );
}