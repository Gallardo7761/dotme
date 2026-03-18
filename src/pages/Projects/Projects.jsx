import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import '@/css/Projects.css'

export default function ProjectsLanding() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      const GITEA_URL = "https://git.miarma.net";
      const USERNAME = "Gallardo7761";

      try {
        const response = await fetch(`${GITEA_URL}/api/v1/users/${USERNAME}/repos?limit=100`);
        if (!response.ok) throw new Error("Fallo en la conexión");
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="projects-container">
      <main className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border primary" role="status"></div>
            <p className="mt-2">Cargando repos...</p>
          </div>
        ) : (
          <div className="row g-4">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="col-md-6 col-lg-4 d-flex"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none w-100"
                >
                  <Card
                    title={repo.name}
                    status={repo.language || "Desconocido"}
                    styleMode="override"
                    className="h-100 w-100"
                  >
                    <div className="card-content">
                      <p className="opacity-75" style={{ fontSize: '0.9em' }}>
                        {repo.description || "Este repo es tan secreto que no tiene ni descripción."}
                      </p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <small className="opacity-50">⭐ {repo.stars_count || 0}</small>
                      {/*<small className="opacity-50">🍴 {repo.forks_count || 0}</small>*/}
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}