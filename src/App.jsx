import '@/css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from '@/pages/Home/Home.jsx'
import Projects from '@/pages/Projects/Projects.jsx'

import Header from '@/components/Header.jsx'
import Link from '@/components/Link.jsx'
import NavBar from '@/components/NavBar.jsx'
import Footer from '@/components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {

  const getCurrentYear = () => {
    const start = new Date('2022-09-10');
    const now = new Date();

    const delta = now.getFullYear() - start.getFullYear();
    const septemberOrLater = now.getMonth() >= 8;

    return delta + (septemberOrLater ? 1 : 0);
  };

  return (
    <>
      <Header title="Hola, soy Jose" subtitle={`Estudiante de Ingeniería de Computadores en la US (${getCurrentYear()}º año)`} />
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
