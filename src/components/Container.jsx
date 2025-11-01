import PropTypes from "prop-types";

const Container = ({ children, fluid }) => {
    return (
        <div className={`${fluid ? "container-fluid" : "container"}`}>
            {children}
        </div>
    );
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    fluid: PropTypes.bool,
}

export default Container;