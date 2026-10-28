import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import Section from '@/components/Section';
import Spot from '@/components/Spot';
import useRepos from '@/hooks/useRepos';

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Java: '#b07219', Kotlin: '#a97bff', Rust: '#dea584', Python: '#3572a5',
  C: '#555555', 'C++': '#f34b7d', CSS: '#563d7c', HTML: '#e34c26', Shell: '#89e051', Go: '#00add8',
  Verilog: '#b2b7f8', VHDL: '#adb2cb', Markdown: '#083fa1', 'KiCad Layout': '#2f4aab',
};
const SORTS = { recent: ['recientes', (a, b) => new Date(b.updated_at) - new Date(a.updated_at)], stars: ['estrellas', (a, b) => b.stars_count - a.stars_count] };

export default function Projects() {
  const { repos, loading, error } = useRepos();
  const [q, setQ] = useState('');
  const [lang, setLang] = useState('Todos');
  const [sort, setSort] = useState('recent');

  const visible = repos.filter((r) => !r.name.startsWith('.'));
  const langs = ['Todos', ...new Set(visible.map((r) => r.language).filter(Boolean))];
  const list = visible
    .filter((r) => (lang === 'Todos' || r.language === lang) &&
      `${r.owner.login} ${r.name} ${r.description || ''}`.toLowerCase().includes(q.toLowerCase()))
    .sort(SORTS[sort][1]);

  return (
    <div className="wrap page">
      <Section n="//" title="Proyectos" aside={!loading && !error && <span className="sec__count">{list.length}/{visible.length}</span>}>
        <div className="tools">
          <input className="search" placeholder="Buscar repos…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar repos" />
          <div className="seg" role="group" aria-label="Ordenar">
            {Object.entries(SORTS).map(([k, [label]]) => (
              <button key={k} className={sort === k ? 'on' : ''} onClick={() => setSort(k)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="chips filters">
          {langs.map((l) => (
            <button key={l} className={`chip-tag ${lang === l ? 'on' : ''}`} onClick={() => setLang(l)}>
              {l !== 'Todos' && <i className="dot" style={{ background: LANG_COLORS[l] ?? 'var(--miarma-text-muted)' }} />}{l}
            </button>
          ))}
        </div>

        {loading && <p className="empty">Cargando repos…</p>}
        {error && <p className="empty">No se ha podido conectar con git.miarma.net. Recarga en un rato.</p>}
        {!loading && !error && !list.length && <p className="empty">Ningún repo coincide con ese filtro.</p>}

        <motion.div layout className="grid">
          <AnimatePresence mode="popLayout">
            {list.map((r) => (
              <Spot key={r.id} as={motion.a} layout className="repo" href={r.html_url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}>
                <FontAwesomeIcon icon={faArrowRight} className="repo__arrow" />
                <span className="repo__owner">
                  <img src={`${r.owner.avatar_url}?size=48`} alt="" width={20} height={20} loading="lazy" />
                  {r.owner.login}
                </span>
                <h3>{r.name}</h3>
                <p>{r.description || 'Este repo no descripción.'}</p>
                <div className="meta">
                  <span><i className="dot" style={{ background: LANG_COLORS[r.language] ?? 'var(--miarma-text-muted)' }} />{r.language || 'Desconocido'}</span>
                  <span><FontAwesomeIcon icon={faStar} /> {r.stars_count} · {new Date(r.updated_at).toLocaleDateString('es-ES')}</span>
                </div>
              </Spot>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  );
}
