import React, { useState, useEffect } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import TablePagination from '@mui/material/TablePagination';
import SortTable from '../../SortTable';
import EnhancedTableHead from '../../HeadSortTable';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button'
import { Link, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';

const headCells = [
  { id: 'nombreLeccionpub', numeric: false, label: 'Nombre' },
  { id: 'detalles', numeric: false }
]

export default function ListaLeccionesPub (props) {
  const [lecciones,setLecciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idLeccionpub');
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
    axios.get("http://localhost:5000/api/lecGrupo/all", {
      headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then (
      (response) => {
        if (response.status === 200) {
          setLecciones(response.data);
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
            {SortTable.stableSort(lecciones, SortTable.getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map ((item) =>{
              return( 
                <TableRow key={item.idLeccionpub}>
                  <TableCell>{item.nombreLeccionpub}</TableCell>
                  <TableCell>
                    <Button variant="contained" component={Link} to={`/lecciones-publicas/detalles/${item.idLeccionpub}`} sx={{backgroundColor: "#03506F", color:"white"}}>
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
      count={lecciones.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
  );
}  