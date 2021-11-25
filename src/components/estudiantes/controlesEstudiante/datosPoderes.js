import React, { useState, useEffect } from 'react'  
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import SortTable from '../../SortTable';
import RegistroPoder from '../../poderes/registroPoder';
import { Redirect } from 'react-router-dom';

const headCells = [
  { id: 'nombrePoder', numeric: false, label: 'Poder' },
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'Seleccionar todo',
            }}
          />
        </TableCell>
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      sx={{backgroundColor: "#03506F", color:"white"}}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Poderes
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DatosPoderes(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('idPoder');
  const [selected, setSelected] = React.useState([]);
  const [poderes,setPoderes] = useState([]); 
  const [refresh, setRefresh] = useState(true)
  const [errorbd, setErrorbd] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  var all = [];
  function handleInputText2 () {
    console.log("Selecciona todo")

    const all = poderes.map(p => p.idPoder);

    if (all.length > props.datos.poderes.length) {
      props.datos.poderes = all
    } else {
      props.datos.poderes = []
    }

    props.setDatos({
      ...props.datos,
      "poderes" : props.datos.poderes
    })
    console.log(props.datos.poderes)
  };

  const handleSelectAllClick = (event) => {

    handleInputText2()

    if (event.target.checked) {
      const newSelecteds = poderes.map((n) => n.nombrePoder);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
    if (refresh){
      fetch("http://localhost:5000/api/poderes/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPoderes(data);
        setErrorbd(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorbd(true);
      });
      setRefresh(false);
    }
  });

  const handleInputText = (event) => {
    var index = props.datos.poderes.indexOf(parseInt(event.target.value))
    if (index === -1) {
      props.datos.poderes = props.datos.poderes.concat([parseInt(event.target.value)])
      console.log("Metio")
    } else {
      props.datos.poderes.splice(index, 1)
      props.datos.poderes = props.datos.poderes.concat([])
      console.log("Saco")
    }
    props.setDatos({
      ...props.datos,
      "poderes" : props.datos.poderes
    })
    console.log(props.datos.poderes)
  };

  if(errorbd) return <Redirect to='/error'/>;


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              value={all}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={poderes.length}
            />
            <TableBody>
              {SortTable.stableSort(poderes, SortTable.getComparator(order, orderBy))
                .map((row, index) => {
                  var isItemSelected = isSelected(row.nombrePoder);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  isItemSelected = props.datos.poderes.indexOf(row.idPoder) === -1 ? false: true

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nombrePoder)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nombrePoder}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={handleInputText}
                          value={row.idPoder}
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
                        {row.nombrePoder}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <RegistroPoder setRefresh={setRefresh}/>
    </Box>
  );
}