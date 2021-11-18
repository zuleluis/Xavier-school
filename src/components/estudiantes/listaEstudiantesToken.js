import React, { Component } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import axios from 'axios'; 
import { Redirect } from "react-router-dom"; 
import { Container } from '@material-ui/core';

class ListaEstudiantes extends Component {  
  constructor(props) {  
    super(props)
    var token = localStorage.getItem("ACCESS_TOKEN");  
    this.state = {  
      EstudiantesData: [],
      isFetched: false,
      error: null,
      token: token  
    }  
  }  
  componentDidMount() {  
    axios.get("http://localhost:5000/api/estudiantes/all",{
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      }
    })
    .then(
      (response) => {
        if (response.status === 200) {
          this.setState(
            {
              estudiantesData: response.data,
              isFetched: true,
              error: null,
            }
          )
        } 
      },
      (error) => {
        if (error.response.status === 401){
          localStorage.removeItem("ACCESS_TOKEN");
          this.setState(
            {
              token:''
            }
          )
        }
      }
    );  
  }  
  render() {  
    if (!this.state.token){
      return(
        <Redirect to = {
          {
            pathname:'*',
            state:{
              from: this.props.location
            }
          }
        }
        />
      )
    }

    if (!this.state.isFetched){
      return(
        <Container>
          <h1>Cargando...</h1>
        </Container>
      )
    }


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