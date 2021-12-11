import React from "react";
import { Grid } from "@mui/material";
import Cards from "../Card";

export default function MenuLecciones() {
    return(
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/list.jpg"
                    imgText = "Presentations's list"
                    Title = "Lista de presentaciones"
                    link = "/presentaciones/lista"
                    altura = "50"
                />
            </Grid>

            <Grid item xs={4} md={4}>
                <Cards
                    imgPath = "media/add.png"
                    imgText = "Add presentation"
                    Title = "Registrar presentación"
                    link = "/presentaciones/registro"
                    altura = "50"
                />
            </Grid>
        </Grid>
    );
}