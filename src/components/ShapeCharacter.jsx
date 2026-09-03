import { motion } from 'framer-motion'
import { pointsToPath } from '../shapes/shapeData'

// Renders a shape as a friendly character with a face.
// Optional interactive corner dots for the tap-to-count game.
export default function ShapeCharacter({
  shape,
  size = 200,
  face = true,
  float = false,
  interactiveCorners = false,
  taggedCorners = [],
  onCornerTap,
  interactiveSides = false,
  taggedSides = [],
  onSideTap,
}) {
  const { colorHex, curved, vertices } = shape

  // Face position: center-ish, nudged up a touch
  const faceCX = curved ? shape.cx : 50
  const faceCY = curved ? shape.cy : centroidY(vertices)

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={float ? { animation: 'floaty 4s ease-in-out infinite' } : undefined}
      className="overflow-visible"
    >
      <defs>
        <radialGradient id={`grad-${shape.id}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={lighten(colorHex)} />
          <stop offset="100%" stopColor={colorHex} />
        </radialGradient>
      </defs>

      {/* Body */}
      {curved ? (
        <circle
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
          fill={`url(#grad-${shape.id})`}
          stroke={darken(colorHex)}
          strokeWidth="2.5"
        />
      ) : (
        <path
          d={pointsToPath(vertices)}
          fill={`url(#grad-${shape.id})`}
          stroke={darken(colorHex)}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      )}

      {/* Tappable sides */}
      {interactiveSides && !curved && vertices.map((v, i) => {
        const next = vertices[(i + 1) % vertices.length]
        const tagged = taggedSides.includes(i)
        return (
          <line
            key={`side-${i}`}
            x1={v.x} y1={v.y} x2={next.x} y2={next.y}
            stroke={tagged ? darken(colorHex) : 'transparent'}
            strokeWidth={tagged ? 5 : 12}
            strokeLinecap="round"
            style={{ cursor: 'pointer' }}
            onClick={() => onSideTap?.(i)}
          />
        )
      })}

      {/* Face */}
      {face && (
        <g style={{ pointerEvents: 'none' }}>
          <circle cx={faceCX - 9} cy={faceCY - 3} r="3.4" fill="#1E293B" />
          <circle cx={faceCX + 9} cy={faceCY - 3} r="3.4" fill="#1E293B" />
          <circle cx={faceCX - 7.7} cy={faceCY - 4.2} r="1.1" fill="#fff" />
          <circle cx={faceCX + 10.3} cy={faceCY - 4.2} r="1.1" fill="#fff" />
          <path
            d={`M ${faceCX - 8} ${faceCY + 6} Q ${faceCX} ${faceCY + 13} ${faceCX + 8} ${faceCY + 6}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx={faceCX - 15} cy={faceCY + 4} r="3" fill={darken(colorHex)} opacity="0.35" />
          <circle cx={faceCX + 15} cy={faceCY + 4} r="3" fill={darken(colorHex)} opacity="0.35" />
        </g>
      )}

      {/* Tappable corners */}
      {interactiveCorners && vertices.map((v, i) => {
        const tagged = taggedCorners.includes(i)
        return (
          <motion.circle
            key={`corner-${i}`}
            cx={v.x}
            cy={v.y}
            r={tagged ? 6 : 5}
            fill={tagged ? '#fff' : darken(colorHex)}
            stroke={tagged ? darken(colorHex) : '#fff'}
            strokeWidth="2.5"
            style={{ cursor: 'pointer' }}
            onClick={() => onCornerTap?.(i)}
            whileTap={{ scale: 1.4 }}
            animate={tagged ? { scale: [1, 1.35, 1] } : {}}
          />
        )
      })}
    </motion.svg>
  )
}

function centroidY(vertices) {
  if (!vertices || vertices.length === 0) return 50
  return vertices.reduce((s, v) => s + v.y, 0) / vertices.length
}

function lighten(hex) {
  return mix(hex, '#ffffff', 0.35)
}
function darken(hex) {
  return mix(hex, '#000000', 0.28)
}
function mix(a, b, t) {
  const pa = parse(a), pb = parse(b)
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t)
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t)
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t)
  return `rgb(${r},${g},${bl})`
}
function parse(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
