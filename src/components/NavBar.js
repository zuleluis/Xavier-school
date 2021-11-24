import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
          color: "#540D18",
      textDecoration: "none",
    },
      logo: {
          height: 50,
          marginRight: theme.spacing(2),
      }
  }));

export default function NavBar(props){
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Link to='/' style={{textDecoration:'none', color:'#FFF'}}>
                <Toolbar>
                    <img src="media/logo.png" alt="logo" className={classes.logo}/>
                    <Typography variant="title" color="inherit">
                    Xavier's School | Jóvenes talento
                    </Typography>
                </Toolbar>
                </Link>
            </AppBar>

        </div>
    );
}