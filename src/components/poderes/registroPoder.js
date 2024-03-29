import { useState } from 'react'  
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { Redirect, useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function RegistroPoder (props){
    const [poder, setPoder] = useState('');
    const [errorbd, setErrorbd] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const location = useLocation();
    const [noAdmin, setNoAdmin] = useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setNoAdmin(false);
    };

    const add = () => {
        axios.post ("http://localhost:5000/api/poderes/save", poder,{
          headers: {
            'Content-type': "application/json",
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          if (response.status === 200) {
            setPoder('')
            props.setRefresh(true)
            setErrorbd(false);
          };
        },
        (error) => {
          //console.log(error);
          if(!error.response) setErrorbd(true);
          else{
            if (error.response.status === 401) {
              if(error.response.data){
                setNoAdmin(true)
              }
              else{
                localStorage.removeItem("ACCESS_TOKEN");
                setToken('');
                setErrorbd(false);
              }
            }
          }
        });
    }

    if(errorbd) return <Redirect to='/error'/>;
    if(!token){
      return(
        <Redirect to={
          {
            pathname:'/login',
            state:{
              from: location
            }
          }
        }/>
      )
    }

    return(
      <Box mt={4}>
          <Typography mb={2}>
              Si no encuentra los poderes del estudiante, favor de registrarlos
          </Typography>

          <Button
            variant="contained"
            sx={{backgroundColor: "#03506F", color:"white"}}
            onClick={() => setIsFormVisible(true)}
          >
            Agregar nuevo poder
          </Button>

          {isFormVisible &&
            <Box>
              <TextField
                type="text"
                id="nombrePoder"
                label="Ingresa el poder"
                onChange={(e) =>{
                  setPoder(e.target.value)
                  setIsFail(false)
                }}
                error={poder==='' && isFail}
                value={poder}
                sx={{mt:2, mb:2}}
              />
              <Grid
                  sx={{mt:1}}
              >
                  <Button
                    variant="contained"
                    onClick={() => poder === '' ? setIsFail(true) : add()}
                    size="small"
                    sx={{mr:1, backgroundColor: "#03506F"}}
                  >
                    Agregar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{backgroundColor: "#C70039"}}
                    onClick={() =>{
                      setIsFormVisible(false)
                      setPoder('')
                      setIsFail(false)
                    }}
                  >
                    Cancelar
                  </Button>{' '}
              </Grid>
            </Box>
          }
        <Snackbar size="medium" open={noAdmin} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Usted no cuenta con permisos para realizar esta acción
          </Alert>
        </Snackbar>
      </Box>
    );
}