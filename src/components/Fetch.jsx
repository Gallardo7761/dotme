import { motion } from 'framer-motion';

const LOGO = [
  '      /\\',
  '     /  \\',
  '    /\\   \\',
  '   /      \\',
  "  /   ,,   \\",
  ' /   |  |  -\\',
  "/_-''    ''-_\\",
].join('\n');

const SWATCHES = ['blue-dark', 'blue', 'text-muted', 'orange-deep', 'orange', 'orange-light', 'text'];

const line = (i) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.15, delay: 0.5 + i * 0.07 } });

export default function Fetch({ specs }) {
  return (
    <figure className="fetch">
      <div className="fetch__bar"><i /><i /><i /><span>jomaa@heimdall: ~</span></div>
      <div className="fetch__body">
        <p className="fetch__cmd"><span>jomaa@heimdall ~ $</span> fastfetch</p>
        <div className="fetch__out">
          <motion.pre className="fetch__logo" aria-hidden="true" {...line(0)}>{LOGO}</motion.pre>
          <div className="fetch__info">
            <motion.p className="fetch__host" {...line(0)}>jomaa<span>@</span>heimdall</motion.p>
            <motion.hr className="fetch__rule" {...line(1)} />
            <dl>
              {specs.map(([k, v], i) => (
                <motion.div key={k} {...line(i + 2)}><dt>{k}</dt><dd>{v}</dd></motion.div>
              ))}
            </dl>
            <motion.div className="fetch__swatches" aria-hidden="true" {...line(specs.length + 2)}>
              {SWATCHES.map((c) => <i key={c} style={{ background: `var(--kb-${c})` }} />)}
            </motion.div>
          </div>
        </div>
        <motion.p className="fetch__cmd" {...line(specs.length + 3)}><span>jomaa@heimdall ~ $</span> <i className="fetch__cursor" /></motion.p>
      </div>
    </figure>
  );
}
