import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [['/', 'Inicio'], ['/proyectos', 'Proyectos']];

export default function Nav({ onPalette }) {
  return (
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
  );
}