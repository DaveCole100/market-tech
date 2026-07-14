interface NodeNetworkProps {
  className?: string;
}

// צמתים (nodes) וקווים (edges) המייצגים חיבור בין פלטפורמות.
const NODES: { x: number; y: number; r: number }[] = [
  { x: 80, y: 90, r: 4 },
  { x: 210, y: 60, r: 6 },
  { x: 330, y: 140, r: 4 },
  { x: 150, y: 210, r: 5 },
  { x: 300, y: 260, r: 4 },
  { x: 440, y: 90, r: 5 },
  { x: 520, y: 200, r: 6 },
  { x: 400, y: 320, r: 4 },
  { x: 620, y: 120, r: 4 },
  { x: 680, y: 260, r: 5 },
  { x: 560, y: 340, r: 4 },
  { x: 740, y: 80, r: 4 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [2, 4],
  [2, 5],
  [5, 6],
  [6, 7],
  [4, 7],
  [5, 8],
  [6, 9],
  [9, 10],
  [7, 10],
  [8, 11],
  [8, 6],
];

/**
 * מוטיב רשת צמתים מחוברים (nodes + lines) בטורקיז בשקיפות נמוכה.
 * דקורטיבי בלבד — aria-hidden. מיועד לשבת מאחורי תוכן על רקע כהה.
 */
export function NodeNetwork({ className = "" }: NodeNetworkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#17B0A6" strokeOpacity="0.22" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>
      <g fill="#17B0A6">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fillOpacity={0.5} />
        ))}
      </g>
      <g fill="#7DD3CD">
        {NODES.filter((_, i) => i % 3 === 0).map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r * 0.5} fillOpacity={0.9} />
        ))}
      </g>
    </svg>
  );
}
