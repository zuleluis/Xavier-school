import React, { useState, useEffect } from 'react'  
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SortTable from '../../../SortTable';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const headCells = [
  { id: 'nombreProfesor', numeric: false, label: 'Profesor' },
  { id: 'apellidoProfesor', numeric: false }
]


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function DatosProfesores(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idProfesor');
  const [profesores, setProfesores] = useState([]);
  const [errorbd, setErrorbd] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/profesores/all", {
    headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    }).then (
    (response) => {
        if (response.status === 200) {
        console.log(response.data)
        setProfesores(response.data);
        setErrorbd(false);
        }
    },
    (error) => {
        if(!error.response) setErrorbd(true);
        else{
            if (error.response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
                setToken('');
                setErrorbd(false);
            }
        }
    }
    );
  },[]);

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


  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper>
          <Table
            sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table"
          >
            <EnhancedTableHead
              sx={visuallyHidden}
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {SortTable.stableSort(profesores, SortTable.getComparator(order, orderBy))
                .filter(row => row.activoOInactivo === 1)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="2"
                      >
                        {row.nombreProfesor} {row.apellidoProfesor}
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="contained" size="small" component="item" onClick={() => 
                          {
                            props.setDatos({
                              ...props.datos,
                              FkProfesorLpriv : row.idProfesor
                            })
                            props.setFlagProfesores(true)
                          }
                        } 
                          sx={{backgroundColor: "#03506F" , color:"white"}}
                          disabled={props.flagProfesores}
                          >
                            Seleccionar
                        </Button>
                    </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" size="small" component="item" onClick={() => 
                {
                  props.setDatos({
                    ...props.datos,
                    FkProfesorLpriv : ''
                  })
                  props.setFlagProfesores(false)
                }
              } 
              sx={{backgroundColor: "#03506F" , color:"white", mr:3, mt:2, mb:2}}
            >
              Cancelar
            </Button>
          </Grid>
      </Paper>
    </Grid>
  );
}