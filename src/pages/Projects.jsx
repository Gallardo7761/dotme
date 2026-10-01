import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spot from '@/components/Spot';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [q, setQ] = useState('');
  const [lang, setLang] = useState('Todos');

  useEffect(() => {
    fetch('https://git.miarma.net/api/v1/users/Gallardo7761/repos?limit=100')
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(setRepos)
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  }, []);

  const langs = ['Todos', ...new Set(repos.map((r) => r.language).filter(Boolean))];
  const list = repos.filter((r) =>
    (lang === 'Todos' || r.language === lang) &&
    `${r.name} ${r.description || ''}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="wrap page">
      <div className="tools">
        <input className="search" placeholder="Buscar repos…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar repos" />
        <div className="chips">
          {langs.map((l) => <button key={l} className={`chip ${lang === l ? 'on' : ''}`} onClick={() => setLang(l)}>{l}</button>)}
        </div>
      </div>

      {loading && <p className="empty">Cargando repos…</p>}
      {err && <p className="empty">No he podido conectar con git.miarma.net. Recarga en un rato.</p>}
      {!loading && !err && !list.length && <p className="empty">Ningún repo coincide con ese filtro.</p>}

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((r) => (
            <Spot key={r.id} as={motion.a} layout href={r.html_url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}>
              <h3>{r.name}</h3>
              <p>{r.description || 'Este repo es tan secreto que no tiene ni descripción.'}</p>
              <div className="meta">
                <span className="tag">{r.language || 'Desconocido'}</span>
                <span>⭐ {r.stars_count || 0} · {new Date(r.updated_at).toLocaleDateString('es-ES')}</span>
              </div>
            </Spot>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}