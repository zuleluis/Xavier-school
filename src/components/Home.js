import React from "react";
import Card from "./Card"
import { Grid } from "@material-ui/core";

export default function Home() {
    return(
        <div>
            <Grid container spacing={2}>
                <Card
                imgPath = "media/students.jpg"
                imgText = "Xavier's School Studients"
                Title = "Estudiantes"
                Description = "Gestion de estudiantes"
                link = "/estudiantes"
                />
                <Card
                    imgPath = "media/teachers.jpg"
                    imgText = "Xavier's School Teachers"
                    Title = "Profesores"
                    Description = "Gestion de Profesores"
                    link = "nanai"
                />
                <Card
                    imgPath = "media/lessons.jpg"
                    imgText = "Xavier's School Lessons"
                    Title = "Lecciones"
                    Description = "Gestion de Lecciones"
                    link = "nelpas"
                />
                <Card
                    imgPath = "media/presentations.jpg"
                    imgText = "Xavier's School Presentations"
                    Title = "Presentaciones"
                    Description = "Gestion de Presentaciones"
                    link = "naranjas"
                />
            </Grid>
        </div>
    );
    
}