import { useEffect, useState } from 'react';

const URL = 'https://cdn.killobyte.es/files/config/dotme.json';
const EMPTY = { interests: [], featured: [], services: [], specs: {} };

let request;
const load = () => {
  request ??= fetch(URL, { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
  request.catch(() => { request = undefined; });
  return request;
};

export default function useContent() {
  const [content, setContent] = useState(EMPTY);

  useEffect(() => {
    let alive = true;
    load().then((c) => alive && setContent({ ...EMPTY, ...c })).catch(() => {});
    return () => { alive = false; };
  }, []);

  return content;
}
