import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home.jsx';
import Projects from '@/pages/Projects.jsx';
import Nav from '@/components/Nav.jsx';

export default function App() {
  return (
    <div className="kb-shell">
      <Nav />
      <main className="kb-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
        </Routes>
      </main>
      <kb-footer />
    </div>
  );
}
