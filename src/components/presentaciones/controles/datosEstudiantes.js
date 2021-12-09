import React, { useState, useEffect } from 'react'  
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import SortTable from '../../SortTable';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const headCells = [
  { id: 'nombreEstudiante', numeric: false, label: 'Estudiantes' },
  { id: 'asistencia', numeric: false},
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
        <TableCell/>
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

export default function DatosEstudiantes(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idEstudiante');
  const [selected, setSelected] = useState([]);
  const [est, setEst] = useState([]);
  const [guardaEstudiantes, setGuardaEstudiantes] = useState({
    idEstudiante: [],
    asistencia: ''
  });
  const [errorbd, setErrorbd] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const location = useLocation();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    axios.get("http://localhost:5000/api/estudiantes/all", {
    headers : {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    }).then (
    (response) => {
        if (response.status === 200) {
        console.log(response.data)
        setEst(response.data);
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

  const handleInputText = (event) => {
    var index = guardaEstudiantes.idEstudiante.indexOf(event.target.value)
    if (index === -1) {
      guardaEstudiantes.idEstudiante = guardaEstudiantes.idEstudiante.concat(event.target.value)
      console.log("Metio")
    } else {
      guardaEstudiantes.asistencia = ''
      guardaEstudiantes.idEstudiante.splice(index, 1)
      guardaEstudiantes.idEstudiante = guardaEstudiantes.idEstudiante.concat([])
      console.log("Saco")
    }
    setGuardaEstudiantes({
        ...guardaEstudiantes,
        idEstudiante : guardaEstudiantes.idEstudiante,
        asistencia :  guardaEstudiantes.asistencia
    })
    console.log(guardaEstudiantes.idEstudiante)
  };

  const handleChange = e => {
		const {name, value} = e.target;
		setGuardaEstudiantes({
		...guardaEstudiantes,
		[name] : value
		})
	};	

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={est.length}
            />
            <TableBody>
              {SortTable.stableSort(est, SortTable.getComparator(order, orderBy))
                .filter(row => row.activoOInactivo === 1)
                .map((row, index) => {
                  var isItemSelected = isSelected(row.idEstudiante);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  isItemSelected = guardaEstudiantes.idEstudiante.indexOf(row.idEstudiante) === -1 ? false: true

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.idEstudiante)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.idEstudiante}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={handleInputText}
                          value={row.idEstudiante}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.nombreEstudiante} {row.apellidoEstudiante}
                      </TableCell>
                      <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id="label">Tipo de asistencia</InputLabel>
                        <Select
                          name="asistencia"
                          label="Tipo de asistencia"
                          labelId="label"
                          id="asistencia"
                          value={guardaEstudiantes.asistencia}
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>Asistente</MenuItem>
                          <MenuItem value={1}>Participante</MenuItem>
                        </Select>
                      </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography>
          {guardaEstudiantes.idEstudiante} - {guardaEstudiantes.asistencia}
        </Typography>
      </Paper>
    </Box>
  );
}