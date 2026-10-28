import { motion } from 'framer-motion';

export default function Section({ n, title, aside, children }) {
  return (
    <section className="sec">
      <motion.header className="sec__head" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
        <span className="sec__n">{n}</span>
        <h2>{title}</h2>
        <span className="sec__rule" />
        {aside}
      </motion.header>
      {children}
    </section>
  );
}
