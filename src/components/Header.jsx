import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import "../css/Header.css";

const Header = ({ subtitle }) => {
  const names = useMemo(() => ["Jose", "Gallardo7761"], []);
  const [isJose, setIsJose] = useState(true);
  const [text, setText] = useState("Hola, soy ");
  const [animationState, setAnimationState] = useState("writing");

  useEffect(() => {
    let timeout;
    const baseText = "Hola, soy ";
    const fullText = baseText + (isJose ? names[0] : names[1]);

    if (animationState === "writing") {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setAnimationState("deleting"), 3000);
      }
    } else if (animationState === "deleting") {
      if (text.length > baseText.length) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsJose((prev) => !prev);
          setAnimationState("writing");
        }, 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, animationState, isJose, names]); // -> Funciona !!! --> edit 08/25: fue mi primera pagina en react, se nota XD

  const subtitleWithCode = (
    <code>
      printf(&quot;%s&quot;, &quot;{subtitle}&quot;);
    </code>
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="header">
      <div className="container d-flex flex-column align-items-center">
        <motion.h1
          className="header-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {text}
        </motion.h1>
        <motion.p id="subtitle"
          className="header-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {isHovered ? subtitleWithCode : subtitle}
        </motion.p>
      </div>
    </header>
  );
};

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

export default Header;
