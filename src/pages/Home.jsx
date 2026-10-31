import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faBook, faCodeBranch, faHeartPulse, faLock, faNetworkWired, faPaste, faServer, faShieldHalved, faStar,
} from '@fortawesome/free-solid-svg-icons';
import Fetch from '@/components/Fetch';
import Section from '@/components/Section';
import useRepos from '@/hooks/useRepos';

const INTERESTS = ['IoT', 'Electrónica', 'Sistemas Empotrados', 'Ciberseguridad', 'Videojuegos', 'Música', 'Animanga'];

const FAV = [
  { title: 'ses-terminal', desc: 'Terminal ciudadana del SES Alas de la Libertad', tech: 'React' },
  { title: 'nucleo', desc: 'Paper plugin for my friends Minecraft server', tech: 'Kotlin' },
  { title: 'contaminus', desc: 'Proyecto Hack4Change 24/25. Fullstack + IoT.', tech: 'React/Java/Python/IoT' },
];

const SERVICES = [
  { title: 'Fragua', host: 'git.killobyte.es', icon: faCodeBranch },
  { title: 'CDN', host: 'cdn.killobyte.es', icon: faNetworkWired },
  { title: 'Caduco', host: 'caduco.killobyte.es', icon: faPaste },
  { title: 'Status', host: 'status.killobyte.es', icon: faHeartPulse, href: 'https://status.killobyte.es/status/public' },
  { title: 'Apuntes', host: 'docs.killobyte.es', icon: faBook },
  { title: 'KID', host: 'id.killobyte.es', icon: faShieldHalved },
];

const year = () => { const n = new Date(); return n.getFullYear() - 2022 + (n.getMonth() >= 8 ? 1 : 0); };

const SPECS = [
  ['estudios', 'Ing. de Computadores · US'],
  ['curso', `${year()}º`],
  ['os', 'Arch Linux (btw)'],
  ['de', 'Hyprland'],
  ['homelab', 'Debian 13'],
  ['stack', 'embedded · backend · low-level'],
  ['ops', 'redes · seguridad · sysadmin'],
  ['uptime', 'demasiado'],
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay },
});

export default function Home() {
  const { repos } = useRepos();
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]));

  return (
    <>
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">
            <i className="eyebrow__dot" />
            <span>hola, soy</span>
          </span>
          <h1 className="hero__name">Jose<span className="accent">.</span></h1>
          <p className="hero__aka">aka <b>Gallardo7761</b></p>
          <div className="btns">
            <Link className="btn" to="/proyectos">Ver proyectos <FontAwesomeIcon icon={faArrowRight} /></Link>
            <a className="btn ghost" href="https://git.killobyte.es/Gallardo7761" target="_blank" rel="noopener noreferrer">Fragua</a>
          </div>
          <dl className="stats">
            <div><dt>{year()}º</dt><dd>curso en la US</dd></div>
            <div><dt>{repos.length || '··'}</dt><dd>repos públicos</dd></div>
            <div><dt>{SERVICES.length}+</dt><dd>servicios propios</dd></div>
          </dl>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <Fetch specs={SPECS} />
        </motion.div>
      </section>

      <Section n="01" title="Sobre mí">
        <div className="about">
          <motion.figure className="portrait" {...rise()}>
            <div className="portrait__frame">
              <img alt="Jose" src="https://git.killobyte.es/Gallardo7761.png" />
              <i /><i /><i /><i />
            </div>
            <figcaption>fig. 2 — el autor, en su hábitat</figcaption>
          </motion.figure>
          <div>
            <motion.p className="lead" {...rise(0.05)}>
              Estudio <span className="accent">Ingeniería de Computadores</span> en la Universidad de Sevilla y me paso
              el día entre Linux, redes, electrónica y webdev. Todo lo que ves en killobyte.es corre en mi propio servidor.
            </motion.p>
            <motion.ul className="likes" {...rise(0.1)}>
              {INTERESTS.map((s) => <li key={s}>{s}</li>)}
            </motion.ul>
          </div>
        </div>
      </Section>

      <Section n="02" title="Proyectos destacados" aside={<Link className="sec__more" to="/proyectos">ver todos →</Link>}>
        <div className="feat">
          {FAV.map((p, i) => {
            const repo = byName[p.title];
            const body = (
              <>
                <span className="feat__idx">0{i + 1}</span>
                <FontAwesomeIcon icon={repo ? faArrowRight : faLock} className="feat__arrow" />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="feat__meta">
                  <span className="tag">{p.tech}</span>
                  {repo ? <span><FontAwesomeIcon icon={faStar} /> {repo.stars_count}</span> : <span>privado</span>}
                </div>
              </>
            );
            return (
              <motion.div key={p.title} {...rise(i * 0.08)}>
                {repo
                  ? <a className="feat__tile" href={repo.html_url} target="_blank" rel="noopener noreferrer">{body}</a>
                  : <div className="feat__tile feat__tile--private">{body}</div>}
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section n="03" title="Homelab" aside={<span className="sec__live"><i />en línea</span>}>
        <div className="svc">
          {SERVICES.map((s, i) => (
            <motion.a key={s.title} className="svc__tile" href={s.href ?? `https://${s.host}`} target="_blank" rel="noopener noreferrer" {...rise(i * 0.05)}>
              <FontAwesomeIcon icon={s.icon} className="svc__icon" />
              <FontAwesomeIcon icon={faArrowRight} className="svc__arrow" />
              <span className="svc__title">{s.title}</span>
              <span className="svc__host">{s.host}</span>
            </motion.a>
          ))}
          <motion.a className="svc__tile svc__tile--all" href="https://killobyte.es" target="_blank" rel="noopener noreferrer" {...rise(0.3)}>
            <FontAwesomeIcon icon={faServer} className="svc__icon" />
            <FontAwesomeIcon icon={faArrowRight} className="svc__arrow" />
            <span className="svc__title">Y más…</span>
            <span className="svc__host">killobyte.es</span>
          </motion.a>
        </div>
      </Section>
    </>
  );
}
