import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Spot from '@/components/Spot';

const NAMES = ['Jose', 'Gallardo7761'];
const SKILLS = ['C', 'Rust', 'Java', 'JS', 'React', 'Python', 'Linux', 'HDL'];
const INTERESTS = ['Informática', 'Electrónica', 'Videojuegos', 'Música', 'Animanga', 'Ciberseguridad'];
const FAV = [
  { title: 'miarma-backend', desc: 'Backend Spring que alimenta todos mis servicios', tech: 'Java/Spring' },
  { title: 'riscv-ac', desc: 'Implementación HDL del procesador RISC-V. Arquitectura pura.', tech: 'Verilog/VHDL' },
  { title: 'contaminus', desc: 'Proyecto Hack4Change 24/25. Fullstack + IoT.', tech: 'React/Python/IoT' },
];
const year = () => { const n = new Date(); return n.getFullYear() - 2022 + (n.getMonth() >= 8 ? 1 : 0); };

function useTyper(words, base = 'Hola, soy ') {
  const [t, setT] = useState(base);
  const [w, setW] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = base + words[w];
    let ms = del ? 60 : 110, fn;
    if (!del && t === full) { ms = 2500; fn = () => setDel(true); }
    else if (del && t === base) { ms = 500; fn = () => { setDel(false); setW((w + 1) % words.length); }; }
    else fn = () => setT(del ? t.slice(0, -1) : full.slice(0, t.length + 1));
    const id = setTimeout(fn, ms);
    return () => clearTimeout(id);
  }, [t, w, del, words, base]);
  return t;
}

const CMDS = {
  help: () => 'help · about · skills · projects · neofetch · whoami · clear',
  about: () => 'Estudiante de Ing. de Computadores en la US. Linux, redes, electrónica y webdev.',
  skills: () => SKILLS.join('  '),
  projects: () => FAV.map((p) => `• ${p.title}: ${p.desc}`).join('\n'),
  whoami: () => 'gallardo7761',
  neofetch: () => 'OS: Arch Linux (btw)\nDE: KDE Plasma\nHomelab: Debian 13\nUptime: demasiado',
};

function Term() {
  const [log, setLog] = useState([{ o: 'Escribe "help" y toca cosas.' }]);
  const [v, setV] = useState('');
  const box = useRef();
  const inp = useRef();

  useEffect(() => { box.current.scrollTop = box.current.scrollHeight; }, [log]);

  const run = (e) => {
    e.preventDefault();
    const c = v.trim();
    setV('');
    if (!c) return;
    if (c === 'clear') return setLog([]);
    const o = CMDS[c]
      ? CMDS[c]()
      : c.startsWith('sudo')
        ? 'jose is not in the sudoers file. This incident will be reported.'
        : `command not found: ${c}`;
    setLog((l) => [...l, { c, o }]);
  };

  return (
    <Spot className="term">
      <div className="bar"><i /><i /><i /><span>~/portfolio</span></div>
      <div className="tbody" ref={box} onClick={() => inp.current.focus()}>
        {log.map((l, k) => (
          <div key={k}>
            {l.c !== undefined && <div><b className="pr">$</b>{l.c}</div>}
            <pre>{l.o}</pre>
          </div>
        ))}
        <form onSubmit={run}>
          <b className="pr">$</b>
          <input ref={inp} value={v} onChange={(e) => setV(e.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal" />
        </form>
      </div>
    </Spot>
  );
}

export default function Home() {
  const typed = useTyper(NAMES);
  return (
    <div className="wrap">
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1>{typed}</h1>
          <p className="sub">Estudiante de Ingeniería de Computadores en la US ({year()}º año)</p>
          <div className="btns">
            <Link className="btn" to="/proyectos">Ver proyectos</Link>
            <a className="btn ghost" href="https://git.miarma.net/Gallardo7761" target="_blank" rel="noopener noreferrer">MiarmaGit</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Term />
        </motion.div>
      </section>

      <section className="bento">
        <div className="s4">
          <Spot className="h">
            <h2>Sobre mí</h2>
            <div className="row">
              <motion.img className="avatar" whileHover={{ rotate: 6, scale: 1.06 }} alt="Avatar"
                src="https://git.miarma.net/avatars/2fba8e2d4e39fffec3bbfe128df0cb9934ccf9b49fd6d310244c6b6209739425?size=512" />
              <p style={{ flex: 1, minWidth: 220, margin: 0 }}>
                Estudiante de <b>Ingeniería de Computadores</b> en la US. Suelo trastear con Linux, redes, electrónica y webdev.
              </p>
            </div>
          </Spot>
        </div>
        <div className="s2">
          <Spot className="h">
            <h2>Stack</h2>
            <div className="chips">{SKILLS.map((s) => <motion.span key={s} className="chip" whileHover={{ y: -3 }}>{s}</motion.span>)}</div>
          </Spot>
        </div>
        {FAV.map((p) => (
          <div className="s2" key={p.title}>
            <Spot as="a" className="h" href={`https://git.miarma.net/Gallardo7761/${p.title}`} target="_blank" rel="noopener noreferrer">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="tag">{p.tech}</span>
            </Spot>
          </div>
        ))}
        <div className="s6">
          <Spot>
            <h2>Intereses</h2>
            <div className="chips">{INTERESTS.map((s) => <motion.span key={s} className="chip" whileHover={{ y: -3 }}>{s}</motion.span>)}</div>
          </Spot>
        </div>
      </section>
    </div>
  );
}