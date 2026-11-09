import PropTypes from 'prop-types';

const LOGO = [
  '      /\\',
  '     /  \\',
  '    /\\   \\',
  '   /      \\',
  "  /   ,,   \\",
  ' /   |  |  -\\',
  "/_-''    ''-_\\",
].join('\n');

const HOST = 'jomaa@heimdall';

// Como la salida de fastfetch, pero en texto: claves con puntos de relleno hasta la misma columna
export default function Fetch({ specs }) {
  const width = Math.max(0, ...specs.map(([k]) => k.length)) + 2;

  return (
    <div className="fetch">
      <pre className="fetch__logo" aria-hidden="true">{LOGO}</pre>
      <div className="fetch__info">
        <p className="fetch__host"><b>{HOST}</b></p>
        <p className="fetch__rule" aria-hidden="true">{'-'.repeat(HOST.length)}</p>
        <dl>
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}<span aria-hidden="true"> {'.'.repeat(width - k.length)}</span></dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

Fetch.propTypes = {
  specs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
