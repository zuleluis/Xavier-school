import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

export default function NavBar(props){
    return (
        <div>
            <AppBar position="static">
                <Link to='/' style={{textDecoration:'none', color:'#FFF'}}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                    Xavier's School | Jóvenes talento
                    </Typography>
                </Toolbar>
                </Link>
            </AppBar>

        </div>
    );
}