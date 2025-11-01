import PropTypes from 'prop-types';
import AbstractLink from './AbstractLink';

const Link = ({ to, children, isNavbar, className = '', ...props }) => {
    return (
        <li className="nav-item" style={{ listStyleType: 'none' }}>  
            <AbstractLink to={to} className={`${isNavbar ? 'nav-link' : ''} ${className}`} {...props}>
                {children}
            </AbstractLink>
        </li>
    );
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isNavbar: PropTypes.bool,
    className: PropTypes.string,
};

export default Link;
