import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ext = (u) => () => window.open(u, '_blank', 'noopener');

export default function CommandPalette({ open, onClose }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const ref = useRef();

  const items = [
    ['Ir a Inicio', () => nav('/')],
    ['Ir a Proyectos', () => nav('/proyectos')],
    ['killobyte.es', ext('https://killobyte.es')],
    ['CDN', ext('https://cdn.killobyte.es')],
    ['Fragua', ext('https://git.killobyte.es/Gallardo7761')],
    ['Instagram', ext('https://instagram.com/gallardoo7761')],
    ['Mastodon', ext('https://masto.es/@gallardo7761')],
  ].filter(([n]) => n.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) { setQ(''); setI(0); setTimeout(() => ref.current?.focus(), 50); }
  }, [open]);

  const run = (it) => { it?.[1](); onClose(); };
  const n = items.length || 1;
  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => (x + 1) % n); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => (x - 1 + n) % n); }
    if (e.key === 'Enter') run(items[i]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="palette" initial={{ y: -16, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: -16, scale: 0.97 }} onClick={(e) => e.stopPropagation()}>
            <input ref={ref} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={onKey} placeholder="Escribe un comando…" />
            {items.map(([name], k) => (
              <div key={name} className={k === i ? 'it on' : 'it'} onMouseEnter={() => setI(k)} onClick={() => run(items[k])}>{name}</div>
            ))}
            {!items.length && <div className="it">Sin resultados</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}