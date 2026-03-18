import { motion } from 'framer-motion';
import '@/css/Home.css';
import Card from '@/components/Card';

const Home = () => {
  return (
    <div className="home-container">
      <main className="container py-5">
        <AboutSection />
        <hr className="custom-hr" />
        <ProjectsSection />
        <hr className="custom-hr" />
        <InterestsSection />
      </main>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="py-4">
      <div className="row align-items-center">
        <motion.div
          className="col-md-5 mb-4 mb-md-0 d-flex justify-content-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="position-relative">
            <div className="position-absolute top-50 start-50 translate-middle rounded-circle" 
                 style={{ width: '300px', height: '300px', background: 'var(--primary-color)', filter: 'blur(60px)', opacity: 0.15 }}></div>
            
            <div className="rounded-circle overflow-hidden shadow-lg border border-3 border-danger" style={{ width: '280px', height: '280px' }}>
              <motion.img
                src="https://git.miarma.net/avatars/2fba8e2d4e39fffec3bbfe128df0cb9934ccf9b49fd6d310244c6b6209739425?size=512"
                alt="Avatar"
                className="w-100 h-100 object-cover"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-7 mt-4 mt-md-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">SOBRE MÍ</h2>
          <p className="lead opacity-75 mb-4">
            Estudiante de 4º de <strong>Ingeniería de Computadores</strong> en la US. 
            Suelo trastear con Linux, redes, electrónica y webdev.
          </p>
          <div className="d-flex flex-wrap gap-2">
            {['C', 'Rust', 'Java', 'JS', 'React', 'Python', 'Linux', 'HDL'].map((skill) => (
              <motion.span
                key={skill}
                className="badge skill-badge px-3 py-2"
                whileHover={{ y: -3, backgroundColor: 'var(--primary-color)', color: '#000' }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    { title: 'miarma-backend', desc: 'Backend Spring que alimenta todos mis servicios', tech: 'Java/Spring' },
    { title: 'riscv-ac', desc: 'Implementación HDL del procesador RISC-V. Arquitectura pura.', tech: 'Verilog/VHDL' },
    { title: 'contaminus', desc: 'Proyecto Hack4Change 24/25. Fullstack + IoT.', tech: 'React/Python/IoT' },
  ];

  return (
    <section>
      <h2 className="section-title">MIS PROYECTOS FAVORITOS</h2>
      <div className="row g-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="col-md-4 d-flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <a 
              href={`https://git.miarma.net/Gallardo7761/${project.title}`} 
              className="text-decoration-none w-100 d-flex"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Card 
                title={project.title} 
                status={project.tech} 
                styleMode="override" 
                className="w-100"
              >
                <div className="card-content py-2">
                  <p className="opacity-75" style={{ fontSize: '0.95rem' }}>
                    {project.desc}
                  </p>
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const InterestsSection = () => {
  const interests = ['Informática', 'Electrónica', 'Videojuegos', 'Música', 'Animanga', 'Ciberseguridad'];
  return (
    <section>
      <h2 className="section-title">INTERESES</h2>
      <div className="row g-3">
        {interests.map((interest, i) => (
          <motion.div
            key={i}
            className="col-md-4 col-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="interest-item rounded shadow-sm h-100 d-flex align-items-center">
              <span>{interest}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home;