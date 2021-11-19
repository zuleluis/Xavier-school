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
import { makeStyles } from '@material-ui/core/styles';

const headCells = [
  { id: 'nombreEstudiante', numeric: false, label: 'Nombre' },
  { id: 'apellidoEstudiante', numeric: false, label: 'Apellido' },
  { id: 'fechaNacimiento', numeric: false, label: 'Edad' },
  { id: 'fechaNacimiento', numeric: false, label: 'Fecha de Nacimiento' },
  { id: 'nssEstudiante', numeric: false, label: 'Numero de Seguro Social' },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 750,
    marginTop: theme.spacing(2),
    border: "1px solid #ccc",
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  row: {
    textDecoration: "none"
  }
}));

export default function ListaEstudiantes () {  
  const [estudiantes,setEstudiantes] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('idEstudiante');
  const classes = useStyles();
 
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
      fetch("http://localhost:5000/api/estudiantes/all")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEstudiantes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[]);

    const dateFormatter = (date) => {
      var formatter = new Intl.DateTimeFormat('en-mx', 'dd-MM-yyyy');
      return formatter.format(new Date (date));
    }

    const getAge = (d1) => {
      d1 = new Date(d1.slice(0,10))
      const d2 = new Date();
      const diff = d2.getTime() - d1.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    return (
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              classes={classes}
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