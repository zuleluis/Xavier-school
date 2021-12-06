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
import AboutUs from './components/aboutUs/AboutUs';
import Logout from './components/login/logout';
import ListaProfesores from './components/profesores/listaProfesores';
import DetallesProfesor from './components/profesores/detallesProfesor';
import MenuProfesores from './components/profesores/menuProfesores';
import RegistroProfesor from './components/profesores/registroProfesor';
import EditarProfesor from './components/profesores/editarProfesor';
import MenuLecciones from './components/lecciones/menuLecciones';
import MenuLeccionesPub from './components/lecciones/leccionesPublicas/menuLeccionespub';
import ListaLeccionesPub from './components/lecciones/leccionesPublicas/listaLeccionesPublicas';
import DetallesLeccionpub from './components/lecciones/leccionesPublicas/detallesLeccionpub';

export default function MainRoutes() {
    return(
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <RegistroUsuario/>
            </Route>
            <Route exact path="/logout">
                <Logout/>
            </Route>
            <Route exact path="/about-us">
                <AboutUs/>
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
            <Route exact path="/profesores">
                <MenuProfesores/>
            </Route>
            <Route exact path="/profesores/lista">
                <ListaProfesores/>
            </Route>
            <Route exact path="/profesores/registro">
                <RegistroProfesor/>
            </Route>
            <Route path="/profesores/detalles/:idProfesor" >
                <DetallesProfesor/>
            </Route>
            <Route path="/profesores/editar" >
                <EditarProfesor/>
            </Route>
            <Route exact path="/lecciones">
                <MenuLecciones/>
            </Route>
            <Route exact path="/lecciones-publicas">
                <MenuLeccionesPub/>
            </Route>
            <Route exact path="/lecciones-publicas/lista">
                <ListaLeccionesPub/>
            </Route>
            <Route path="/lecciones-publicas/detalles/:idLeccionpub" >
                <DetallesLeccionpub/>
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