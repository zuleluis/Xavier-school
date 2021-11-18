import React, { Component } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import axios from 'axios';  

class ListaEstudiantes extends Component {  
  constructor(props) {  
    super(props)  
    this.state = {  
      EstudiantesData: []  
    }  
  }  
  componentDidMount() {  
    axios.get("http://localhost:5000/api/estudiantes/all")
    .then(response => {  
      console.log(response.data);  
      this.setState({  
        EstudiantesData: response.data  
      });  
    });  
  }  
  render() {  
    const estudiantesData = this.state.EstudiantesData;  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Numero de Seguro Social</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {estudiantesData.map ((item) =>( 
                <TableRow key={item.idEstudiante}>
                  <TableCell>{item.nombre_estudiante}</TableCell>
                  <TableCell>{item.apellido_estudiante}</TableCell>
                  <TableCell>{item.Edad}</TableCell>
                  <TableCell>{item.fecha_nacimiento}</TableCell>
                  <TableCell>{item.nss_estudiante}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }  
}  
export default ListaEstudiantes