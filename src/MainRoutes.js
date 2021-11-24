import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListaEstudiantes from './components/estudiantes/listaEstudiantes';
import MenuEstudiantes from './components/estudiantes/menuEstudiantes';
import Home from './components/Home';
import RegistroEstudiante from './components/estudiantes/registroEstudiante'
import DetallesEstudiante from './components/estudiantes/detallesEstudiante';

export default function MainRoutes() {
    return(
        <Switch>
            <Route exact path="/estudiantes">
                <MenuEstudiantes/>
            </Route>
            <Route exact path="/lista-estudiantes">
                <ListaEstudiantes/>
            </Route>
            <Route exact path="/registro-estudiante">
                <RegistroEstudiante/>
            </Route>
            <Route path="/estudiantes/detalles/:idEstudiante" >
                <DetallesEstudiante/>
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