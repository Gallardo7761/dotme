const LEFT = ['Embedded', 'Backend', 'Cybersecurity', 'Networking'];
const RIGHT = ['HDL', 'Linux', 'Hardware Design', 'sysadmin'];
const PIN_Y = [108, 156, 204, 252];

function Pin({ side, y, n, label }) {
  const left = side === 'left';
  const pin = left ? 104 : 280;
  const from = left ? 104 : 296;
  const via = left ? 52 : 348;
  return (
    <g className="pin" style={{ '--d': n }}>
      <line className="pin__trace" x1={from} y1={y} x2={via} y2={y} />
      <line className="pin__pulse" x1={from} y1={y} x2={via} y2={y} />
      <rect className="pin__leg" x={pin} y={y - 5} width="16" height="10" rx="2" />
      <circle className="pin__via" cx={via} cy={y} r="4" />
      <text className="pin__n" x={left ? 130 : 270} y={y + 3} textAnchor={left ? 'start' : 'end'}>{n}</text>
      <text className="pin__label" x={left ? via - 10 : via + 10} y={y + 4} textAnchor={left ? 'end' : 'start'}>{label}</text>
    </g>
  );
}

export default function Chip() {
  return (
    <figure className="chip">
      <svg viewBox="0 0 400 340" role="img" aria-label={`Chip JG-7761: ${[...LEFT, ...RIGHT].join(', ')}`}>
        {LEFT.map((l, i) => <Pin key={l} side="left" y={PIN_Y[i]} n={i + 1} label={l} />)}
        {RIGHT.map((l, i) => <Pin key={l} side="right" y={PIN_Y[i]} n={8 - i} label={l} />)}
        <rect className="chip__body" x="120" y="60" width="160" height="240" rx="10" />
        <path className="chip__notch" d="M184 60 a16 16 0 0 0 32 0" />
        <circle className="chip__dot" cx="140" cy="84" r="4" />
        <text className="chip__brand" x="200" y="172" textAnchor="middle">JG-7761</text>
        <text className="chip__sub" x="200" y="194" textAnchor="middle">GALLARDO</text>
        <text className="chip__sub" x="200" y="210" textAnchor="middle">RV32I · {new Date().getFullYear()}</text>
      </svg>
      <figcaption>fig. 1 — JG-7761, encapsulado DIP-8</figcaption>
    </figure>
  );
}
