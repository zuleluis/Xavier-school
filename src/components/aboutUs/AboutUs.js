import * as React from 'react';
import { Grid } from '@mui/material';
import PersonalCard from '../personalCard';
import { Typography } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';

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
          descripcion=  "Desarrollo de back end utilizando .NET Core 5 y C#"
        />
      </Grid>

      <Grid item>
      <TextInfoContent
          classes={textCardContentStyles}
          heading="Sobre nosotros"
          body="Aqui le voy a poner un choro"
        />
      </Grid>
    </Grid>
  );
}