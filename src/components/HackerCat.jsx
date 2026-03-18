import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HackerCat = () => {
  const [pos, setPos] = useState({ x: -100, y: 500 });
  const [command, setCommand] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const linuxCommands = [
    "sudo rm -rf /", 
    "apt update", 
    "git push --force", 
    "kill -9 -1", 
    "shutdown -h now",
    "ping 8.8.8.8",
    "whoami"
  ];

  useEffect(() => {
    const spawnCat = () => {
      if (Math.random() > 0.4) return; 

      const windowH = window.innerHeight;
      const randomY = Math.floor(Math.random() * (windowH - 200)) + 50;
      const randomCmd = linuxCommands[Math.floor(Math.random() * linuxCommands.length)];
      
      setPos({ x: -200, y: randomY });
      setCommand(randomCmd);
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 11000);
    };

    const timer = setInterval(spawnCat, 300000); 

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: pos.x, y: pos.y }}
      animate={{ 
        x: [pos.x, window.innerWidth + 200],
        y: [pos.y, pos.y - 50, pos.y + 50, pos.y]
      }}
      transition={{ 
        duration: 10, 
        ease: "linear",
        y: { duration: 2, repeat: 5, ease: "easeInOut" }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{
        background: '#1e1e1e',
        color: 'var(--text-color)',
        padding: '5px 10px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: "'Fira Code', monospace",
        border: '1px solid var(--primary-color)',
        marginBottom: '5px',
        boxShadow: '0 0 10px var(--secondary-color)',
        whiteSpace: 'nowrap'
      }}>
        <span style={{ color: '#ffffff' }}>$</span> {command}
      </div>

      <img 
        src="/cat.gif" 
        alt="Hacker Cat" 
        style={{ width: '100px', filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))' }}
      />
    </motion.div>
  );
};

export default HackerCat;