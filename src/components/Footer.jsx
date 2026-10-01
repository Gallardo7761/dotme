import { useEffect, useState } from 'react';

const HEARTS = ['❤️', '💛', '🧡', '💚', '💙', '💜'];

export default function Footer() {
  const [heart, setHeart] = useState('💜');
  useEffect(() => {
    const id = setInterval(() => setHeart(HEARTS[Math.floor(Math.random() * HEARTS.length)]), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="foot">
      <span>Dev&apos;d with {heart} by Gallardo7761</span>
      <div className="links">
        <a href="https://git.miarma.net/Gallardo7761" target="_blank" rel="noopener noreferrer">MiarmaGit</a>
        <a href="https://instagram.com/gallardoo7761" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://masto.es/@gallardo7761" target="_blank" rel="me noopener noreferrer" className="mastodon-verify">Mastodon</a>
      </div>
    </footer>
  );
}