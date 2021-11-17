import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Cards(props){
  return (
    <Card sx={{ maxWidth: 345 , margin: 1, boxShadow: 3}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {props.imgPath}//"media/students.jpg"
          alt= {props.imgText}//"Xavier's School students"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
