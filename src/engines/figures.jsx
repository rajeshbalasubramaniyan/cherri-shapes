// Small SVG drawings used by the quiz levels. Everything scales to its box.

const INK = '#334155'

function Frame({ w = 200, h = 200, size = 220, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={size} height={(size * h) / w} className="max-w-full overflow-visible">
      {children}
    </svg>
  )
}

const pts = list => list.map(p => p.join(',')).join(' ')

// A regular polygon with n sides (or custom points in a 200 box).
export function Poly({ n, points, color = '#38BDF8', dots = false, labels }) {
  const p = points || Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n + (n % 2 ? 0 : Math.PI / n)
    return [100 + 78 * Math.cos(a), 104 + 78 * Math.sin(a)]
  })
  return (
    <Frame>
      <polygon points={pts(p)} fill={color + '33'} stroke={color} strokeWidth="4" strokeLinejoin="round" />
      {dots && p.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={INK} />)}
      {labels?.map((l, i) => (
        <text key={i} x={l[0]} y={l[1]} textAnchor="middle" fontSize="16" fontWeight="700" fill={l[3] || INK}>{l[2]}</text>
      ))}
    </Frame>
  )
}

// Curved, straight or both.
export function Outline({ kind, color = '#FB7185' }) {
  const d = {
    circle: <circle cx="100" cy="100" r="72" />,
    oval: <ellipse cx="100" cy="100" rx="84" ry="54" />,
    semicircle: <path d="M28 130 A72 72 0 0 1 172 130 Z" />,
    square: <rect x="35" y="35" width="130" height="130" rx="2" />,
    triangle: <polygon points="100,28 172,165 28,165" />,
    star: <polygon points="100,20 120,78 182,78 132,114 150,174 100,138 50,174 68,114 18,78 80,78" />,
    heart: <path d="M100 168 C30 120 20 80 50 55 C72 38 92 48 100 66 C108 48 128 38 150 55 C180 80 170 120 100 168 Z" />,
    dome: <path d="M30 160 L30 100 A70 70 0 0 1 170 100 L170 160 Z" />,
  }[kind]
  return (
    <Frame>
      <g fill={color + '33'} stroke={color} strokeWidth="5" strokeLinejoin="round">{d}</g>
    </Frame>
  )
}

// An emoji placed relative to a box: on, under, beside, inside, behind.
export function Scene({ pos, thing = '🐱' }) {
  const place = {
    on: [100, 52], under: [100, 186], beside: [180, 132], inside: [100, 128], behind: [130, 88],
  }[pos]
  const box = <g><rect x="45" y="80" width="110" height="80" rx="6" fill="#FDE68A" stroke="#B45309" strokeWidth="4" />
    <line x1="45" y1="100" x2="155" y2="100" stroke="#B45309" strokeWidth="3" /></g>
  const pet = <text x={place[0]} y={place[1]} textAnchor="middle" fontSize={pos === 'behind' ? 40 : 48}>{thing}</text>
  return (
    <Frame h={210}>
      <line x1="10" y1={pos === 'under' ? 202 : 160} x2="190" y2={pos === 'under' ? 202 : 160} stroke="#94A3B8" strokeWidth="3" />
      {pos === 'under' && <><rect x="55" y="80" width="10" height="122" fill="#B45309" /><rect x="135" y="80" width="10" height="122" fill="#B45309" />
        <rect x="40" y="70" width="120" height="14" rx="4" fill="#D97706" /></>}
      {pos === 'behind' && pet}
      {pos !== 'under' && box}
      {pos !== 'behind' && pet}
      {pos === 'inside' && <rect x="45" y="80" width="110" height="20" fill="#FDE68A" stroke="#B45309" strokeWidth="4" />}
    </Frame>
  )
}

// A shape cut into parts, some shaded. kind: circle | square | bar. equal=false draws an unfair cut.
export function Fraction({ kind = 'circle', parts = 2, shaded = 1, equal = true, color = '#A78BFA' }) {
  if (kind === 'circle') {
    const r = 80, c = 100
    const cuts = equal ? Array.from({ length: parts }, (_, i) => (i * 360) / parts) : [0, 120]
    const n = cuts.length
    return (
      <Frame>
        {cuts.map((a0, i) => {
          const a1 = i === n - 1 ? 360 : cuts[i + 1]
          const p = a => [c + r * Math.sin((a * Math.PI) / 180), c - r * Math.cos((a * Math.PI) / 180)]
          const [x0, y0] = p(a0), [x1, y1] = p(a1)
          const large = a1 - a0 > 180 ? 1 : 0
          return <path key={i} d={`M${c},${c} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`}
            fill={i < shaded ? color : '#fff'} stroke={INK} strokeWidth="3" />
        })}
      </Frame>
    )
  }
  if (kind === 'bar') {
    const widths = equal ? Array(parts).fill(180 / parts) : [120, 60]
    let x = 10
    return (
      <Frame h={110}>
        {widths.map((w, i) => { const el = <rect key={i} x={x} y="25" width={w} height="60" fill={i < shaded ? color : '#fff'} stroke={INK} strokeWidth="3" />; x += w; return el })}
      </Frame>
    )
  }
  // square split into a grid of parts (2 = halves, 4 = quarters)
  const cols = parts === 4 ? 2 : parts, rows = parts === 4 ? 2 : 1
  const s = 160 / cols, t = 160 / rows
  return (
    <Frame>
      {Array.from({ length: parts }).map((_, i) => (
        <rect key={i} x={20 + (i % cols) * s} y={20 + Math.floor(i / cols) * t} width={s} height={t}
          fill={i < shaded ? color : '#fff'} stroke={INK} strokeWidth="3" />
      ))}
    </Frame>
  )
}

// An arrow that starts pointing up and turns clockwise by `turn` degrees. Ghost shows the start.
export function Turn({ turn = 90, ccw = false }) {
  const arrow = 'M100,30 L135,75 L113,75 L113,160 L87,160 L87,75 L65,75 Z'
  const deg = ccw ? -turn : turn
  // sweep arc showing how far and which way it turned
  const R = 92, sweep = Math.min(Math.abs(deg), 350)
  const at = a => [100 + R * Math.sin((a * Math.PI) / 180), 100 - R * Math.cos((a * Math.PI) / 180)]
  const end = ccw ? -sweep : sweep
  const [ex, ey] = at(end)
  const [hx, hy] = at(end - (ccw ? -10 : 10))
  const arc = `M${at(0).join(',')} A${R},${R} 0 ${sweep > 180 ? 1 : 0} ${ccw ? 0 : 1} ${ex},${ey}`
  return (
    <Frame>
      <path d={arc} fill="none" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${hx + (ey - hy) * 0.6},${hy - (ex - hx) * 0.6} ${hx - (ey - hy) * 0.6},${hy + (ex - hx) * 0.6}`} fill="#0284C7" />
      <path d={arrow} fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" strokeDasharray="5 4" />
      <path d={arrow} transform={`rotate(${deg} 100 100)`} fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
      <circle cx="100" cy="100" r="5" fill={INK} />
    </Frame>
  )
}

// An angle of `deg` degrees with an arc, opening from a horizontal ray.
export function Angle({ deg, label }) {
  const big = deg > 90
  const vx = big ? 100 : 45, vy = deg > 180 ? 95 : 150, L = big ? 88 : 130
  const rad = (deg * Math.PI) / 180
  const ex = vx + L * Math.cos(rad), ey = vy - L * Math.sin(rad)
  const r = 34
  return (
    <Frame h={deg > 180 ? 195 : 180}>
      <line x1={vx} y1={vy} x2={vx + L} y2={vy} stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={ex} y2={ey} stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {deg === 90
        ? <path d={`M${vx + 24},${vy} L${vx + 24},${vy - 24} L${vx},${vy - 24}`} fill="none" stroke="#FB923C" strokeWidth="3" />
        : <path d={`M${vx + r},${vy} A${r},${r} 0 ${deg > 180 ? 1 : 0} 0 ${vx + r * Math.cos(rad)},${vy - r * Math.sin(rad)}`} fill="none" stroke="#FB923C" strokeWidth="4" />}
      {label && <text x={vx + 50} y={vy - 14} fontSize="16" fontWeight="700" fill="#C2410C">{label}</text>}
    </Frame>
  )
}

// Pairs of lines: parallel, perpendicular, intersecting.
export function Lines({ kind }) {
  const s = { stroke: '#0284C7', strokeWidth: 6, strokeLinecap: 'round' }
  return (
    <Frame>
      {kind === 'parallel' && <><line x1="30" y1="60" x2="170" y2="40" {...s} /><line x1="30" y1="150" x2="170" y2="130" {...s} /></>}
      {kind === 'perpendicular' && <><line x1="100" y1="25" x2="100" y2="175" {...s} /><line x1="25" y1="100" x2="175" y2="100" {...s} />
        <path d="M100,82 L118,82 L118,100" fill="none" stroke="#FB923C" strokeWidth="3" /></>}
      {kind === 'intersecting' && <><line x1="30" y1="40" x2="170" y2="160" {...s} /><line x1="30" y1="120" x2="170" y2="70" {...s} /></>}
    </Frame>
  )
}

// A labelled rectangle (sizes in cm) or an L-shape built from two rectangles.
export function Measured({ w, h, unit = 'cm', color = '#FBBF24', shape = 'rect', cut }) {
  const scale = Math.min(110 / w, 100 / h)
  const W = w * scale, H = h * scale, x = 100 - W / 2, y = 95 - H / 2
  if (shape === 'triangle') {
    return (
      <Frame>
        <polygon points={`${x},${y + H} ${x + W},${y + H} ${x + W * 0.3},${y}`} fill={color + '44'} stroke={color} strokeWidth="4" strokeLinejoin="round" />
        <line x1={x + W * 0.3} y1={y} x2={x + W * 0.3} y2={y + H} stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
        <text x={x + W / 2} y={y + H + 24} textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>{w} {unit}</text>
        <text x={x + W * 0.3 + 8} y={y + H / 2 + 6} fontSize="16" fontWeight="700" fill={INK}>{h} {unit}</text>
      </Frame>
    )
  }
  if (shape === 'L') {
    // cut = [cw, ch]: a block removed from the top right corner
    const [cw, ch] = cut
    const p = [[x, y], [x + (w - cw) * scale, y], [x + (w - cw) * scale, y + ch * scale], [x + W, y + ch * scale], [x + W, y + H], [x, y + H]]
    return (
      <Frame>
        <polygon points={pts(p)} fill={color + '44'} stroke={color} strokeWidth="4" strokeLinejoin="round" />
        <text x={x + W / 2} y={y + H + 24} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{w} {unit}</text>
        <text x={x - 10} y={y + H / 2} textAnchor="end" fontSize="15" fontWeight="700" fill={INK}>{h}</text>
        <text x={x + ((w - cw) * scale) / 2} y={y - 8} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{w - cw}</text>
        <text x={x + W + 8} y={y + (ch * scale + H) / 2} fontSize="15" fontWeight="700" fill={INK}>{h - ch}</text>
      </Frame>
    )
  }
  return (
    <Frame>
      <rect x={x} y={y} width={W} height={H} fill={color + '44'} stroke={color} strokeWidth="4" />
      <text x={100} y={y + H + 24} textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>{w} {unit}</text>
      <text x={x + W + 10} y={y + H / 2 + 6} fontSize="16" fontWeight="700" fill={INK}>{h} {unit}</text>
    </Frame>
  )
}

// A triangle with two angles labelled and the third marked "?".
export function AngleTriangle({ a, b }) {
  // drawn to scale: base angles a and b, apex found with the sine rule
  const L = 150, Ax = 25, Ay = 170
  const rad = d => (d * Math.PI) / 180
  const side = (L * Math.sin(rad(b))) / Math.sin(rad(a + b))
  const C = [Ax + side * Math.cos(rad(a)), Ay - side * Math.sin(rad(a))]
  const p = [[Ax, Ay], [Ax + L, Ay], C]
  return (
    <Frame h={185}>
      <polygon points={pts(p)} fill="#FB718533" stroke="#FB7185" strokeWidth="4" strokeLinejoin="round" />
      {a === 90
        ? <path d={`M${Ax + 18},${Ay} L${Ax + 18},${Ay - 18} L${Ax},${Ay - 18}`} fill="none" stroke="#C2410C" strokeWidth="2.5" />
        : null}
      <text x={Ax + (a === 90 ? 24 : 22)} y={Ay - (a === 90 ? 24 : 8)} fontSize="16" fontWeight="700" fill={INK}>{a}°</text>
      <text x={Ax + L - 22} y={Ay - 8} textAnchor="end" fontSize="16" fontWeight="700" fill={INK}>{b}°</text>
      <text x={C[0]} y={C[1] + 30} textAnchor="middle" fontSize="18" fontWeight="700" fill="#C2410C">?</text>
    </Frame>
  )
}

// A straight line (180) or a full turn (360) split into angles; the last one is "?".
export function AngleSplit({ angles, total = 180 }) {
  const cx = 100, cy = total === 180 ? 150 : 100, R = 80
  let start = 0
  const rays = [0]
  angles.forEach(a => { start += a; rays.push(start) })
  const pt = (deg, r = R) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)]
  const labels = [...angles, total - start].map((a, i) => {
    const from = i === 0 ? 0 : rays.slice(0, i + 1).at(-1)
    const mid = from + a / 2
    const [x, y] = pt(mid, 48)
    return <text key={i} x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={i === angles.length ? '#C2410C' : INK}>{i === angles.length ? '?' : `${a}°`}</text>
  })
  return (
    <Frame h={total === 180 ? 170 : 200}>
      {total === 180
        ? <line x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} stroke={INK} strokeWidth="5" strokeLinecap="round" />
        : <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={INK} strokeWidth="5" strokeLinecap="round" />}
      {rays.slice(1).map((d, i) => { const [x, y] = pt(d); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={INK} strokeWidth="5" strokeLinecap="round" /> })}
      <circle cx={cx} cy={cy} r="5" fill={INK} />
      {labels}
    </Frame>
  )
}

// A cuboid built from unit cubes, drawn in isometric view.
export function Cubes({ w, d, h, color = '#38BDF8' }) {
  const s = Math.min(55, 165 / (w + d + h))
  const cos = Math.cos(Math.PI / 6) * s, sin = s / 2
  const ox = 100 - ((w - d) * cos) / 2, oy = 100 + (h * s) / 2 - ((w + d) * sin) / 2
  const P = (x, y, z) => [ox + (x - y) * cos, oy + (x + y) * sin - z * s]
  const cubes = []
  for (let z = 0; z < h; z++) for (let y = 0; y < d; y++) for (let x = 0; x < w; x++) cubes.push([x, y, z])
  cubes.sort((A, B) => (A[0] + A[1] + A[2]) - (B[0] + B[1] + B[2]) || A[2] - B[2])
  return (
    <Frame>
      {cubes.map(([x, y, z], i) => (
        <g key={i} stroke="#0F172A" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points={pts([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)])} fill={color} />
          <polygon points={pts([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)])} fill={color + 'AA'} />
          <polygon points={pts([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)])} fill={color + '77'} />
        </g>
      ))}
    </Frame>
  )
}

// A net drawn on a grid. Each piece: { sq: [c, r] } or { tri: [[c,r],...] } or { circle: [c, r, radius] } or { rect: [c, r, w, h] }.
export function Net({ pieces, cols = 4, rows = 3, color = '#4ADE80' }) {
  const u = Math.min(180 / cols, 180 / rows)
  const ox = 100 - (cols * u) / 2, oy = 100 - (rows * u) / 2
  const g = ([c, r]) => [ox + c * u, oy + r * u]
  const style = { fill: color + '55', stroke: '#166534', strokeWidth: 2.5, strokeLinejoin: 'round' }
  return (
    <Frame>
      {pieces.map((p, i) => {
        if (p.sq) { const [x, y] = g(p.sq); return <rect key={i} x={x} y={y} width={u} height={u} {...style} /> }
        if (p.rect) { const [x, y] = g(p.rect); return <rect key={i} x={x} y={y} width={p.rect[2] * u} height={p.rect[3] * u} {...style} /> }
        if (p.tri) return <polygon key={i} points={pts(p.tri.map(g))} {...style} />
        if (p.circle) { const [x, y] = g(p.circle); return <circle key={i} cx={x} cy={y} r={p.circle[2] * u} {...style} /> }
        return null
      })}
    </Frame>
  )
}

// A first-quadrant coordinate grid. points: [{x,y,label?,color?}], shapes: [{pts:[[x,y]...], color, ghost?}]
export function Grid({ size = 6, points = [], shapes = [], line }) {
  const u = 160 / size, ox = 28, oy = 182
  const X = x => ox + x * u, Y = y => oy - y * u
  return (
    <Frame h={200}>
      {Array.from({ length: size + 1 }).map((_, i) => (
        <g key={i}>
          <line x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(size)} stroke="#CBD5E1" strokeWidth="1" />
          <line x1={X(0)} y1={Y(i)} x2={X(size)} y2={Y(i)} stroke="#CBD5E1" strokeWidth="1" />
          <text x={X(i)} y={oy + 14} textAnchor="middle" fontSize="10" fill="#64748B">{i}</text>
          {i > 0 && <text x={ox - 8} y={Y(i) + 4} textAnchor="end" fontSize="10" fill="#64748B">{i}</text>}
        </g>
      ))}
      <line x1={X(0)} y1={Y(0)} x2={X(size)} y2={Y(0)} stroke={INK} strokeWidth="2" />
      <line x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(size)} stroke={INK} strokeWidth="2" />
      {line && <line x1={X(line[0][0])} y1={Y(line[0][1])} x2={X(line[1][0])} y2={Y(line[1][1])} stroke="#FB923C" strokeWidth="2.5" strokeDasharray="6 4" />}
      {shapes.map((s, i) => (
        <polygon key={i} points={pts(s.pts.map(([x, y]) => [X(x), Y(y)]))}
          fill={s.ghost ? 'none' : (s.color || '#8B5CF6') + '55'} stroke={s.ghost ? '#94A3B8' : s.color || '#8B5CF6'}
          strokeWidth="2.5" strokeDasharray={s.ghost ? '5 4' : undefined} strokeLinejoin="round" />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={X(p.x)} cy={Y(p.y)} r="6" fill={p.color || '#EF4444'} />
          {p.label && <text x={X(p.x) + 9} y={Y(p.y) - 7} fontSize="13" fontWeight="700" fill={INK}>{p.label}</text>}
        </g>
      ))}
    </Frame>
  )
}
