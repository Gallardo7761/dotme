import { useState } from 'react';
import useRepos from '@/hooks/useRepos';

const SORTS = { recent: ['recientes', (a, b) => new Date(b.updated_at) - new Date(a.updated_at)], stars: ['estrellas', (a, b) => b.stars_count - a.stars_count] };

export default function Projects() {
  const { repos, loading, error } = useRepos();
  const [q, setQ] = useState('');
  const [lang, setLang] = useState('');
  const [sort, setSort] = useState('recent');

  const visible = repos.filter((r) => !r.name.startsWith('.'));
  const langs = [...new Set(visible.map((r) => r.language).filter(Boolean))].sort();
  const list = visible
    .filter((r) => (!lang || r.language === lang) &&
      `${r.owner.login} ${r.name} ${r.description || ''}`.toLowerCase().includes(q.toLowerCase()))
    .sort(SORTS[sort][1]);

  return (
    <>
      <h1>Proyectos</h1>
      <p>
        Repositorios públicos en <a href="https://git.killobyte.es/Gallardo7761" target="_blank" rel="noopener noreferrer">git.killobyte.es</a>
        {!loading && !error && <span className="kb-muted"> · mostrando {list.length} de {visible.length}</span>}
      </p>

      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <label>Buscar <input type="search" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <label>Lenguaje{' '}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="">todos</option>
            {langs.map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        <label>Ordenar por{' '}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </label>
      </form>

      {loading && <p className="kb-muted">Cargando repos…</p>}
      {error && <p>No se ha podido conectar con git.killobyte.es. Recarga en un rato.</p>}
      {!loading && !error && !list.length && <p className="kb-muted">Ningún repo coincide con ese filtro.</p>}

      {list.length > 0 && (
        <div className="kb-scroll">
          <table className="repos">
            <thead><tr><th>Repositorio</th><th>Descripción</th><th>Lenguaje</th><th>★</th><th>Actualizado</th></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td><span className="kb-muted">{r.owner.login}/</span><a href={r.html_url} target="_blank" rel="noopener noreferrer">{r.name}</a></td>
                  <td>{r.description || <span className="kb-muted">sin descripción</span>}</td>
                  <td>{r.language || <span className="kb-muted">—</span>}</td>
                  <td className="num">{r.stars_count}</td>
                  <td className="kb-mono">{new Date(r.updated_at).toLocaleDateString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
