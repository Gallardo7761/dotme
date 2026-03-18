import Link from '@/components/Link';
import '@/css/Footer.css';
import { useState, useEffect, useCallback } from 'react';

const Footer = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hearts = ["❤️", "💛", "🧡", "💚", "💙", "💜"];
  const [heart, setHeart] = useState("💜");

  const randomHeart = useCallback(() => {
    return hearts[Math.floor(Math.random() * hearts.length)];
  }, [hearts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeart(randomHeart());
    }, 1000);
    return () => clearInterval(interval);
  }, [randomHeart]);

  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <p className="footer-dev-text">
          Dev&apos;d with <span className="heart-icon">{heart}</span> by Gallardo7761
        </p>
        
        <span className="footer-divider">|</span>

        <ul className="footer-links">
          <Link to="https://git.miarma.net/Gallardo7761">MiarmaGit</Link>
          <Link to="https://instagram.com/gallardoo7761">Instagram</Link>
          <Link to="https://reddit.com/u/Gallardo7761">Reddit</Link>
          <li className="nav-item">
            <a className="mastodon-verify" rel="noopener noreferer" target='_blank' href="https://masto.es/@gallardo7761">
              Mastodon
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;