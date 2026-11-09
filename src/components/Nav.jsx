import { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const links = [['/', 'Inicio'], ['/proyectos', 'Proyectos']];

export default function Nav() {
  const navigate = useNavigate();
  const home = (e) => {
    if (!e.target.closest('.kb-header__brand') || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate('/');
  };

  return (
    <kb-header site="jose" tag="portfolio · ingeniería de computadores" onClick={home}>
      <nav className="nav">
        {links.map(([to, label], i) => (
          <Fragment key={to}>
            {i > 0 && ' | '}
            <NavLink to={to} end>{label}</NavLink>
          </Fragment>
        ))}
      </nav>
    </kb-header>
  );
}
