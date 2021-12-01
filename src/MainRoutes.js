import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListaEstudiantes from './components/estudiantes/listaEstudiantes';
import MenuEstudiantes from './components/estudiantes/menuEstudiantes';
import Home from './components/Home';
import RegistroEstudiante from './components/estudiantes/registroEstudiante'
import DetallesEstudiante from './components/estudiantes/detallesEstudiante';
import EditarEstudiante from './components/estudiantes/editarEstudiante';
import Login from './components/login/login';
import RegistroUsuario from './components/login/registroUsuario';

export default function MainRoutes() {
    return(
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <RegistroUsuario/>
            </Route>
            <Route exact path="/estudiantes">
                <MenuEstudiantes/>
            </Route>
            <Route exact path="/estudiantes/lista">
                <ListaEstudiantes/>
            </Route>
            <Route exact path="/estudiantes/registro">
                <RegistroEstudiante/>
            </Route>
            <Route path="/estudiantes/detalles/:idEstudiante" >
                <DetallesEstudiante/>
            </Route>
            <Route path="/estudiantes/editar" >
                <EditarEstudiante/>
            </Route>
            <Route path="/error">
                <h1>ERROR 503: Oops! La página que buscas no está disponible :(</h1>
            </Route>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="*">
                <h1> Oops! La página que buscas no existe :(</h1>
            </Route>
        </Switch>
    );
    
}