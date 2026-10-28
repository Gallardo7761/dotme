import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [['/', 'Inicio'], ['/proyectos', 'Proyectos']];

export default function Nav({ onPalette }) {
  return (
    <header className="topbar">
      <div className="topbar__in">
        <Link to="/" className="brand">
          <img src="https://cdn.miarma.net/files/img/logo-without-text.svg" alt="" width={30} height={30} />
          <span>jose<span className="accent">.</span>miarma<span className="accent">.</span>net</span>
        </Link>
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
      </div>
    </header>
  );
}
