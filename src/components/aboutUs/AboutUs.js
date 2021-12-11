import * as React from 'react';
import { Grid } from '@mui/material';
import PersonalCard from '../personalCard';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { Typography } from '@mui/material';

export default function AboutUs() {
  const textCardContentStyles = useN04TextInfoContentStyles();
  return(
    <Grid container spacing={3}>
      <Grid item>
        <PersonalCard
          imagen='media/zule.jpg'
          cargo='Front end'
          nombre="Zulema Luis"
          descripcion= "Desarrollo de la interfaz gráfica utilizando React JS y Material UI"
        />
        
      </Grid>
      
      <Grid item>
        <PersonalCard
          imagen='media/saul.jpg'
          cargo='Back end'
          nombre="Saul Romero"
          descripcion=  "Desarrollo de back end utilizando MySQL, .NET Core 5 y C#"
        />
      </Grid>

      <Grid item xs={5}>
      <TextInfoContent
          classes={textCardContentStyles}
          heading="Sobre nosotros"
          body="La plataforma de Xavier's School nace como un proyecto para la materia de Programación de Sistemas Basados en Web,
          impartida por el profesor Gonzalo Antonio Sosa Málaga en el programa Educativo Ingeniería Informática de la Universidad Veracruzana, región Veracruz.
          "
        />
        <TextInfoContent
          classes={textCardContentStyles}
          body="Nos sentimos demasiado felices de compartir este proyecto que fue realizado con mucho esmero y dedicación, esperando que sea de su agrado"
        />
        <Typography
          align="right"
          sx={{
            fontWeight: 'light' ,
            fontSize: 14,
            mt:4
          }}
        >
        - Zulema Luis y Saúl Romero, Diciembre 2021.
        </Typography>
      </Grid>
    </Grid>
  );
}