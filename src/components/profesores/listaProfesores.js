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
import { Link, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';

const headCells = [
  { id: 'nombreProfesor', numeric: false, label: 'Nombre' },
  { id: 'apellidoProfesor', numeric: false, label: 'Apellido' },
  { id: 'fechaNacimientopr', numeric: false, label: 'Edad' },
  { id: 'fechaNacimientopr', numeric: false, label: 'Fecha de Nacimiento' },
  { id: 'nssProfesor', numeric: false, label: 'Numero de Seguro Social' },
  { id: 'activoOInactivo', numeric: false, label: 'Status' },
  { id: 'acciones', numeric: false, label: 'Acciones' },
]

export default function ListaProfesores (props) {
  const [profesores,setProfesores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idProfesor');
  const [errorbd, setErrorbd] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();
 
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
    axios.get("http://localhost:5000/api/profesores/all", {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then (
      (response) => {
        if (response.status === 200) {
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

    
  if(errorbd) return <Redirect to='/error'/>;
  if(!token){
    return(
      //console.log(location.pathname),
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
            {SortTable.stableSort(profesores, SortTable.getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map ((item) =>{
              return( 
                <TableRow key={item.idProfesor}>
                  <TableCell>{item.nombreProfesor}</TableCell>
                  <TableCell>{item.apellidoProfesor}</TableCell>
                  <TableCell>{getAge(item.fechaNacimientopr)} años</TableCell>
                  <TableCell>{dateFormatter(item.fechaNacimientopr)}</TableCell>
                  <TableCell>{item.nssProfesor}</TableCell>
                  <TableCell>{item.activoOInactivo === 1 ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Button variant="contained" component={Link} to={`/profesores/detalles/${item.idProfesor}`} sx={{backgroundColor: "#03506F", color:"white"}}>
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
      count={profesores.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
  );
}  