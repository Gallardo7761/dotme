import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Fetch from '@/components/Fetch';
import Section from '@/components/Section';
import useContent from '@/hooks/useContent';
import useRepos from '@/hooks/useRepos';

const year = () => { const n = new Date(); return n.getFullYear() - 2022 + (n.getMonth() >= 8 ? 1 : 0); };

const JUMP = [['sobre-mi', 'Sobre mí'], ['setup', 'Mi setup'], ['proyectos', 'Proyectos'], ['homelab', 'Homelab']];

// botones de 88x31, como los de las webs de antes
const BADGES = [['arch linux', 'btw'], ['hyprland', 'wm'], ['debian', '13'], ['self', 'hosted']];

export default function Home() {
  const { repos } = useRepos();
  const { interests, featured, services, specs } = useContent();
  const specList = Object.entries(specs).map(([k, v]) => [k, String(v).replace('{curso}', year())]);
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]));
  const lastActivity = repos.reduce((max, r) => (r.updated_at > max ? r.updated_at : max), '');

  return (
    <>
      <div className="welcome">
        <h1>¡Hola! Soy Jose</h1>
        <p>aka <b>Gallardo7761</b> · estudiante de Ingeniería de Computadores en la Universidad de Sevilla</p>
        <p className="welcome__jump">
          Ir a:{' '}
          {JUMP.map(([id, label], i) => <Fragment key={id}>{i > 0 && ' · '}<a href={`#${id}`}>{label}</a></Fragment>)}
        </p>
      </div>

      <hr />

      <Section id="sobre-mi" title="Sobre mí">
        <figure className="portrait">
          <img alt="Jose" src="https://git.killobyte.es/Gallardo7761.png" width={160} height={160} />
          <figcaption>el autor, en su hábitat</figcaption>
        </figure>
        <p>
          Estoy en {year()}º de Ingeniería de Computadores en la US y me paso el día entre Linux, redes,
          electrónica y webdev. Todo lo que ves en <a href="https://killobyte.es">killobyte.es</a> corre en mi propio servidor.
        </p>
        {interests.length > 0 && <p><b>Cosas que me gustan:</b> {interests.join(', ')}.</p>}
      </Section>

      <hr />

      <Section id="setup" title="Mi setup">
        <Fetch specs={specList} />
      </Section>

      <hr />

      <Section id="proyectos" title="Proyectos destacados">
        <ul className="list">
          {featured.map((p) => {
            const repo = byName[p.title];
            return (
              <li key={p.title}>
                {repo ? <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{p.title}</a> : <b>{p.title}</b>}
                {' '}— {p.desc}{' '}
                <span className="kb-muted">[{p.tech}{repo ? ` · ★ ${repo.stars_count}` : ' · privado'}]</span>
              </li>
            );
          })}
        </ul>
        <p><Link to="/proyectos">ver todos mis proyectos{repos.length ? ` (${repos.length})` : ''} →</Link></p>
      </Section>

      <hr />

      <Section id="homelab" title="Mi homelab">
        <p>Servicios que tengo montados en casa:</p>
        <table className="homelab">
          <tbody>
            {services.map((s) => (
              <tr key={s.title}>
                <td><a href={s.href ?? `https://${s.host}`} target="_blank" rel="noopener noreferrer">{s.title}</a></td>
                <td className="kb-muted">{s.host}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>…y el resto, en <a href="https://killobyte.es" target="_blank" rel="noopener noreferrer">er çentro</a>.</p>
      </Section>

      <hr />

      <div className="badges" aria-hidden="true">
        {BADGES.map(([name, tag]) => <span key={name} className="badge">{name}<b>{tag}</b></span>)}
      </div>
      {lastActivity && (
        <p className="updated kb-muted">Última actividad en la Fragua: {new Date(lastActivity).toLocaleDateString('es-ES')}</p>
      )}
    </>
  );
}
