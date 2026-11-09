import PropTypes from 'prop-types';

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
