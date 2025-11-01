import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from '../pages/Home/Home.jsx'
import Projects from '../pages/Projects/Projects.jsx'

import Header from './Header.jsx'
import Link from './Link.jsx'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {

  const getCursoActualCarrera = () => {
    const inicio = new Date('2022-09-10');
    const ahora = new Date();

    const añosPasados = ahora.getFullYear() - inicio.getFullYear();
    const haPasadoSeptiembre = ahora.getMonth() >= 8;

    const cursoActual = añosPasados + (haPasadoSeptiembre ? 1 : 0);
    return cursoActual;
  };

  return (
    <>
      <Header title="Hola, soy Jose" subtitle={`Estudiante de Ingeniería de Computadores en la US (${getCursoActualCarrera()}º año)`} />
      <NavBar>
        <Link to="/" isNavbar>Inicio</Link>
        <Link to="/proyectos" isNavbar>Proyectos</Link>
      </NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
