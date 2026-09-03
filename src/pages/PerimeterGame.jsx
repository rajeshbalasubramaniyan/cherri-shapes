import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

// Grid shapes; child taps each unit edge around the border to measure perimeter.
// Each puzzle: rectangle w x h (in units). Perimeter = 2*(w+h).
const PUZZLES = [
  { w: 3, h: 2, color: '#38BDF8' },
  { w: 4, h: 3, color: '#FB7185' },
  { w: 5, h: 2, color: '#4ADE80' },
]
const UNIT = 44

export default function PerimeterGame({ onHome, onComplete }) {
  const [pi, setPi] = useState(0)
  const [count, setCount] = useState(0)
  const [tappedEdges, setTappedEdges] = useState(new Set())

  const p = PUZZLES[pi]
  const perimeter = 2 * (p.w + p.h)
  const done = count === perimeter
  const isLast = pi === PUZZLES.length - 1
  const finished = done && isLast

  // build the list of border unit-edges as {id, x1,y1,x2,y2}
  const edges = []
  for (let i = 0; i < p.w; i++) {
    edges.push({ id: `t${i}`, x1: i, y1: 0, x2: i + 1, y2: 0 })
    edges.push({ id: `b${i}`, x1: i, y1: p.h, x2: i + 1, y2: p.h })
  }
  for (let j = 0; j < p.h; j++) {
    edges.push({ id: `l${j}`, x1: 0, y1: j, x2: 0, y2: j + 1 })
    edges.push({ id: `r${j}`, x1: p.w, y1: j, x2: p.w, y2: j + 1 })
  }

  const tapEdge = (id) => {
    if (tappedEdges.has(id)) return
    const next = new Set(tappedEdges); next.add(id)
    setTappedEdges(next); setCount(next.size)
    if (next.size === perimeter) {
      setTimeout(() => {
        if (isLast) onComplete?.()
        else { setPi(pi + 1); setCount(0); setTappedEdges(new Set()) }
      }, 1200)
    }
  }

  const pad = 20
  const svgW = p.w * UNIT + pad * 2
  const svgH = p.h * UNIT + pad * 2

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Around We Go" onHome={onHome} right={`${pi + 1}/${PUZZLES.length}`} />
      <Celebrate show={done} />

      <p className="text-center text-ink-soft text-sm px-6 mb-1">
        {done ? `Perimeter = ${perimeter} units! 🎉` : 'Tap each unit around the edge to measure the perimeter'}
      </p>
      <p className="text-center font-display text-2xl mb-3" style={{ color: p.color }}>{count} units</p>

      <div className="flex-1 flex items-center justify-center px-6">
        <svg width={svgW} height={svgH} className="max-w-full">
          {/* fill */}
          <rect x={pad} y={pad} width={p.w * UNIT} height={p.h * UNIT} fill={p.color + '18'} />
          {/* inner grid */}
          {Array.from({ length: p.w - 1 }).map((_, i) => (
            <line key={`v${i}`} x1={pad + (i + 1) * UNIT} y1={pad} x2={pad + (i + 1) * UNIT} y2={pad + p.h * UNIT} stroke={p.color + '33'} strokeWidth="1" />
          ))}
          {Array.from({ length: p.h - 1 }).map((_, j) => (
            <line key={`h${j}`} x1={pad} y1={pad + (j + 1) * UNIT} x2={pad + p.w * UNIT} y2={pad + (j + 1) * UNIT} stroke={p.color + '33'} strokeWidth="1" />
          ))}
          {/* tappable border edges */}
          {edges.map(e => {
            const tapped = tappedEdges.has(e.id)
            return (
              <line
                key={e.id}
                x1={pad + e.x1 * UNIT} y1={pad + e.y1 * UNIT}
                x2={pad + e.x2 * UNIT} y2={pad + e.y2 * UNIT}
                stroke={tapped ? p.color : '#cbd5e1'}
                strokeWidth={tapped ? 7 : 5}
                strokeLinecap="round"
                style={{ cursor: 'pointer' }}
                onClick={() => tapEdge(e.id)}
              />
            )
          })}
          {/* corner dots */}
          {[[0,0],[p.w,0],[0,p.h],[p.w,p.h]].map(([x,y],i) => (
            <circle key={i} cx={pad + x*UNIT} cy={pad + y*UNIT} r="3.5" fill={p.color} />
          ))}
        </svg>
      </div>

      {finished && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onHome}
            className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
            Back to Journey →
          </motion.button>
        </div>
      )}
    </div>
  )
}
