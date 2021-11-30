import React, { useState, useEffect } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import TablePagination from '@mui/material/TablePagination';
import SortTable from '../SortTable';
import EnhancedTableHead from '../HeadSortTable';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const headCells = [
  { id: 'nombreEstudiante', numeric: false, label: 'Nombre' },
  { id: 'apellidoEstudiante', numeric: false, label: 'Apellido' },
  { id: 'fechaNacimiento', numeric: false, label: 'Edad' },
  { id: 'fechaNacimiento', numeric: false, label: 'Fecha de Nacimiento' },
  { id: 'nssEstudiante', numeric: false, label: 'Numero de Seguro Social' },
  { id: 'nivelpoder', numeric: false, label: 'Nivel de Poder' },
  { id: 'activoOInactivo', numeric: false, label: 'Status' },
  { id: 'acciones', numeric: false, label: 'Acciones' },
]

export default function ListaEstudiantes (props) {
  const [estudiantes,setEstudiantes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idEstudiante');
  const [errorbd, setErrorbd] = useState(false);

  
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/estudiantes/all", {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then (
      (response) => {
        if (response.status === 200) {
          setEstudiantes(response.data);
          setErrorbd(false);
          setIsFetched(true);
          setError(null);
        }
      },
      (error) => {
        console.log("Todo mal");
        setErrorbd(true);
      }
    );
  },[])
  

  const dateFormatter = (date) => {
    var formatter = new Intl.DateTimeFormat('en-mx', 'DD-MM-YYYY');
    return formatter.format(new Date (date));
  }

  const getAge = (d1) => {
    d1 = new Date(d1.slice(0,10))
    const d2 = new Date();
    const diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

    
  //if(errorbd) return <Redirect to='/error'/>;

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            sx={visuallyHidden}
            order={order}
            orderBy={orderBy}
            headCells={headCells}
            onRequestSort={handleRequestSort}
          />
                  
          <TableBody>
            {SortTable.stableSort(estudiantes, SortTable.getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map ((item) =>{
              return( 
                <TableRow key={item.idEstudiante}>
                  <TableCell>{item.nombreEstudiante}</TableCell>
                  <TableCell>{item.apellidoEstudiante}</TableCell>
                  <TableCell>{getAge(item.fechaNacimiento)} años</TableCell>
                  <TableCell>{dateFormatter(item.fechaNacimiento)}</TableCell>
                  <TableCell>{item.nssEstudiante}</TableCell>
                  <TableCell>{item.nivelpoder}</TableCell>
                  <TableCell>{item.activoOInactivo === 1 ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Button variant="contained" component={Link} to={`/estudiantes/detalles/${item.idEstudiante}`} sx={{backgroundColor: "#03506F", color:"white"}}>
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 10, 50]}
      component="div"
      count={estudiantes.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
  );
}  