export default function Spot({ as: T = 'div', className = '', children, ...p }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return <T className={`sp ${className}`} onMouseMove={move} {...p}>{children}</T>;
}