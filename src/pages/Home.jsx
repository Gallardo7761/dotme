import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faBook, faCodeBranch, faHeartPulse, faLock, faNetworkWired, faPaste, faServer, faShieldHalved, faStar,
} from '@fortawesome/free-solid-svg-icons';
import Chip from '@/components/Chip';
import Section from '@/components/Section';
import useRepos from '@/hooks/useRepos';

const INTERESTS = ['IoT', 'Electrónica', 'Sistemas Empotrados', 'Ciberseguridad', 'Videojuegos', 'Música', 'Animanga'];

const FAV = [
  { title: 'ses-terminal', desc: 'Terminal ciudadana del SES Alas de la Libertad', tech: 'React' },
  { title: 'mkernel', desc: 'Paper plugin for my friends Minecraft server', tech: 'Kotlin' },
  { title: 'contaminus', desc: 'Proyecto Hack4Change 24/25. Fullstack + IoT.', tech: 'React/Java/Python/IoT' },
];

const SERVICES = [
  { title: 'MiarmaGit', host: 'git.miarma.net', icon: faCodeBranch },
  { title: 'mCDN', host: 'cdn.miarma.net', icon: faNetworkWired },
  { title: 'MiarmaPaste', host: 'paste.miarma.net', icon: faPaste },
  { title: 'Status', host: 'status.miarma.net', icon: faHeartPulse, href: 'https://status.miarma.net/status/public' },
  { title: 'MiarmaDocs', host: 'docs.miarma.net', icon: faBook },
  { title: 'MiarmaID', host: 'id.miarma.net', icon: faShieldHalved },
];

const year = () => { const n = new Date(); return n.getFullYear() - 2022 + (n.getMonth() >= 8 ? 1 : 0); };

const SPECS = [
  ['Estudios', 'Ing. de Computadores · US'],
  ['Curso', `${year()}º`],
  ['OS', 'Arch Linux (btw)'],
  ['DE', 'KDE Plasma'],
  ['Homelab', 'Debian 13'],
  ['Uptime', 'demasiado'],
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
    <div className="wrap">
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="eyebrow">
            <i className="eyebrow__dot" />
            <span>hoja de datos</span>
            <span className="eyebrow__part">JG-7761 · rev. {new Date().getFullYear()}</span>
          </span>
          <h1 className="hero__name">Jose<span className="accent">.</span></h1>
          <p className="hero__aka">aka <b>Gallardo7761</b></p>
          <div className="btns">
            <Link className="btn" to="/proyectos">Ver proyectos <FontAwesomeIcon icon={faArrowRight} /></Link>
            <a className="btn ghost" href="https://git.miarma.net/Gallardo7761" target="_blank" rel="noopener noreferrer">MiarmaGit</a>
          </div>
          <dl className="stats">
            <div><dt>{year()}º</dt><dd>curso en la US</dd></div>
            <div><dt>{repos.length || '··'}</dt><dd>repos públicos</dd></div>
            <div><dt>{SERVICES.length}+</dt><dd>servicios propios</dd></div>
          </dl>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <Chip />
        </motion.div>
      </section>

      <Section n="01" title="Sobre mí">
        <div className="about">
          <motion.figure className="portrait" {...rise()}>
            <div className="portrait__frame">
              <img alt="Jose" src="https://git.miarma.net/avatars/2fba8e2d4e39fffec3bbfe128df0cb9934ccf9b49fd6d310244c6b6209739425?size=512" />
              <i /><i /><i /><i />
            </div>
            <figcaption>fig. 2 — el autor, en su hábitat</figcaption>
          </motion.figure>
          <div>
            <motion.p className="lead" {...rise(0.05)}>
              Estudio <span className="accent">Ingeniería de Computadores</span> en la Universidad de Sevilla y me paso
              el día entre Linux, redes, electrónica y webdev. Todo lo que ves en miarma.net corre en mi propio servidor.
            </motion.p>
            <motion.dl className="facts" {...rise(0.1)}>
              {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </motion.dl>
            <motion.ul className="likes" {...rise(0.15)}>
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
          <motion.a className="svc__tile svc__tile--all" href="https://miarma.net" target="_blank" rel="noopener noreferrer" {...rise(0.3)}>
            <FontAwesomeIcon icon={faServer} className="svc__icon" />
            <FontAwesomeIcon icon={faArrowRight} className="svc__arrow" />
            <span className="svc__title">Y más…</span>
            <span className="svc__host">miarma.net</span>
          </motion.a>
        </div>
      </Section>

    </div>
  );
}
