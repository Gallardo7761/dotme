import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

import Home from '@/pages/Home.jsx';
import Projects from '@/pages/Projects.jsx';
import Nav from '@/components/Nav.jsx';
import Footer from '@/components/Footer.jsx';
import CommandPalette from '@/components/CommandPalette.jsx';
import HackerCat from '@/components/HackerCat';

export default function App() {
  const loc = useLocation();
  const [pal, setPal] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const move = (e) => {
      const s = document.documentElement.style;
      s.setProperty('--mx', `${e.clientX}px`);
      s.setProperty('--my', `${e.clientY}px`);
    };
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((p) => !p); }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('keydown', key); };
  }, []);

  useEffect(() => {
    const code = Math.floor(Math.random() * (0x1f64f - 0x1f300 + 1)) + 0x1f300;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${code.toString(16)}.svg`;
    link.type = 'image/svg+xml';
  }, []);

  return (
    <>
      <div className="bg" />
      <motion.div className="progress" style={{ scaleX }} />
      <Nav onPalette={() => setPal(true)} />
      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <HackerCat />
      <CommandPalette open={pal} onClose={() => setPal(false)} />
    </>
  );
}