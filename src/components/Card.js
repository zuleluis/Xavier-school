import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Cards(props){
  return (
    <Card sx={{ maxWidth: 345 , margin: 1, boxShadow: 3}}>
      <Link to={props.link} style={{textDecoration:'none'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {props.imgPath}
          alt= {props.imgText}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color="#000000">
            {props.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}
