import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #f8f9fa, #dee2e6)' }}>
      <main className="container-fluid">
        <AboutSection />
        <ProjectsSection />
        <InterestsSection />
      </main>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-md-6 mb-4 mb-md-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-circle overflow-hidden mx-auto shadow-lg" style={{ width: '300px', height: '300px' }}>
              <motion.img
                src="https://avatars.githubusercontent.com/u/100301878?v=4"
                alt="Avatar"
                className="w-100 h-100 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="h3 fw-bold mb-3">Sobre Mí</h2>
            <p className="text-muted mb-4">
              Soy un estudiante de Ingeniería de Computadores en la Universidad de Sevilla, en mi cuarto año. 
              Actualmente me dedico a linux, redes, microcontroladores y webdev.
            </p>
            <div className="d-flex flex-wrap gap-2">
              {['C/C++', 'Java', 'React', 'Vanilla JS', 'Python', 'MariaDB', 'Linux' ].map((skill) => (
                <motion.span
                  key={skill}
                  className="badge px-3 py-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InterestsSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="h3 fw-bold mb-4 text-center">Intereses</h2>
        <div className="row g-3">
          {['Informática', 'Electrónica', 'Videojuegos', 'Música', 'Animanga', 'Ciberseguridad'].map((interest, index) => (
            <motion.div
              key={interest}
              className="col-md-4 col-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-3 bg-white rounded shadow">
                {interest}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="h3 fw-bold mb-4 text-center">Mis Proyectos Favoritos</h2>
        <div className="row g-4">
          {[
            { title: 'core', desc: 'Mega-backend que alimenta todos mis servicios' },
            { title: 'mkernel', desc: 'Plugin que hace que mi servidor de Minecraft funcione' },
            { title: 'amodgus', desc: 'Mod de Minecraft para introducir al Amongus (sus)' },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              className="col-md-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;