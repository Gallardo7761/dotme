import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '@/css/NavBar.css';

const NavBar = ({ children }) => {
  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark shadow-sm">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <span className="navbar-toggler-icon-custom-line"></span>
          </span>
        </button>
        <motion.div
          className="collapse navbar-collapse"
          id="navbarContent"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {children}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavBar;