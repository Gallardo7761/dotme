import PropTypes from 'prop-types';
import { Link as RouterLink, useInRouterContext } from 'react-router-dom';

const AbstractLink = ({ to, children, className = '', ...props }) => {
    const isInternal = to.startsWith('/');
    const isRouterAvailable = useInRouterContext(); // verifica si estamos dentro de un Router

    if (isInternal && isRouterAvailable) {
        return (
            <RouterLink className={className} to={to} {...props}>
                {children}
            </RouterLink>
        );
    }

    return (
        <a className={className} href={to} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}

AbstractLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default AbstractLink;
