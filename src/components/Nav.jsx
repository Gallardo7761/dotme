import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [['/', 'Inicio'], ['/proyectos', 'Proyectos']];

export default function Nav({ onPalette }) {
  const navigate = useNavigate();
  const home = (e) => {
    if (!e.target.closest('.kb-header__brand') || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate('/');
  };

  return (
    <kb-header site="jose" tag="portfolio · ingeniería de computadores" onClick={home}>
      <nav className="nav">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end className={({ isActive }) => (isActive ? 'on' : '')}>
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                {label}
              </>
            )}
          </NavLink>
        ))}
        <button className="kbd" onClick={onPalette} aria-label="Abrir paleta de comandos">Ctrl K</button>
      </nav>
    </kb-header>
  );
}
