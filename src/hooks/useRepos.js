import { useEffect, useState } from 'react';

const API = 'https://git.killobyte.es/api/v1/users';
const USERS = ['Gallardo7761', 'huertos-bellavista', 'croppy', 'archivo'];

const fetchRepos = (user) => fetch(`${API}/${user}/repos?limit=100`)
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });

let request;
const load = () => {
  request ??= Promise.all(USERS.map(fetchRepos)).then((lists) => lists.flat());
  request.catch(() => { request = undefined; });
  return request;
};

export default function useRepos() {
  const [state, setState] = useState({ repos: [], loading: true, error: false });

  useEffect(() => {
    let alive = true;
    load()
      .then((repos) => alive && setState({ repos, loading: false, error: false }))
      .catch(() => alive && setState({ repos: [], loading: false, error: true }));
    return () => { alive = false; };
  }, []);

  return state;
}
