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
import RegistroLeccionpub from './components/lecciones/leccionesPublicas/registroLeccionpub';
import MenuLeccionesPriv from './components/lecciones/leccionesPrivadas/menuLeccionespriv';
import ListaLeccionesPriv from './components/lecciones/leccionesPrivadas/listaLeccionesPrivadas';
import DetallesLeccionpriv from './components/lecciones/leccionesPrivadas/detallesLeccionpriv';
import RegistroLeccionpriv from './components/lecciones/leccionesPrivadas/registroLeccionpriv';
import MenuPresentaciones from './components/presentaciones/menuPresentaciones';
import ListaPresentaciones from './components/presentaciones/listaPresentaciones';
import DetallesPresentacion from './components/presentaciones/detallesPresentacion';
import RegistroPresentacion from './components/presentaciones/registroPresentacion';

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
            <Route exact path="/lecciones-publicas/registro">
                <RegistroLeccionpub/>
            </Route>
            <Route exact path="/lecciones-privadas">
                <MenuLeccionesPriv/>
            </Route>
            <Route exact path="/lecciones-privadas/lista">
                <ListaLeccionesPriv/>
            </Route>
            <Route path="/lecciones-privadas/detalles/:idLeccionpriv" >
                <DetallesLeccionpriv/>
            </Route>
            <Route exact path="/lecciones-privadas/registro">
                <RegistroLeccionpriv/>
            </Route>
            <Route exact path="/presentaciones">
                <MenuPresentaciones/>
            </Route>
            <Route exact path="/presentaciones/lista">
                <ListaPresentaciones/>
            </Route>
            <Route path="/presentaciones/detalles/:idPresentacion" >
                <DetallesPresentacion/>
            </Route>
            <Route exact path="/presentaciones/registro">
                <RegistroPresentacion/>
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