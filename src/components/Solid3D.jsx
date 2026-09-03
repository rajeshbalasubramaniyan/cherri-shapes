// Simple, friendly isometric-ish renderings of 3D solids.
function shade(hex, t) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16)
  const m = (v, tt) => Math.round(v + (tt > 0 ? (255 - v) * tt : v * tt))
  return `rgb(${m(r, t)},${m(g, t)},${m(b, t)})`
}

export default function Solid3D({ id, color, size = 160 }) {
  const light = shade(color, 0.28)
  const dark = shade(color, -0.28)
  const stroke = shade(color, -0.4)
  const s = { stroke, strokeWidth: 2, strokeLinejoin: 'round' }

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {id === 'cube' && (
        <>
          <polygon points="30,45 60,30 90,45 60,60" fill={light} {...s} />
          <polygon points="30,45 60,60 60,95 30,80" fill={color} {...s} />
          <polygon points="90,45 60,60 60,95 90,80" fill={dark} {...s} />
        </>
      )}
      {id === 'sphere' && (
        <>
          <circle cx="60" cy="62" r="38" fill={color} {...s} />
          <ellipse cx="48" cy="48" rx="14" ry="9" fill={light} opacity="0.8" />
        </>
      )}
      {id === 'cone' && (
        <>
          <ellipse cx="60" cy="90" rx="34" ry="12" fill={dark} {...s} />
          <path d="M60 22 L94 90 A34 12 0 0 1 26 90 Z" fill={color} {...s} />
          <path d="M60 22 L26 90 A34 12 0 0 0 60 102" fill={light} opacity="0.5" />
        </>
      )}
      {id === 'cylinder' && (
        <>
          <ellipse cx="60" cy="92" rx="30" ry="11" fill={dark} {...s} />
          <rect x="30" y="30" width="60" height="62" fill={color} stroke={stroke} strokeWidth="2" />
          <line x1="30" y1="30" x2="30" y2="92" stroke={stroke} strokeWidth="2" />
          <line x1="90" y1="30" x2="90" y2="92" stroke={stroke} strokeWidth="2" />
          <ellipse cx="60" cy="30" rx="30" ry="11" fill={light} {...s} />
        </>
      )}
      {id === 'pyramid' && (
        <>
          <polygon points="60,22 30,88 60,100 20,80" fill={color} {...s} />
          <polygon points="60,22 90,88 60,100 100,80" fill={dark} {...s} />
          <polygon points="60,22 30,88 60,100 90,88" fill={light} {...s} />
        </>
      )}
    </svg>
  )
}
