import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

// Tap every unit square inside the shape to cover it. Area = number of squares = w*h.
const PUZZLES = [
  { w: 3, h: 2, color: '#F59E0B' },
  { w: 4, h: 3, color: '#38BDF8' },
  { w: 5, h: 4, color: '#4ADE80' },
]
const UNIT = 46

export default function AreaGame({ onHome, onComplete }) {
  const [pi, setPi] = useState(0)
  const [filled, setFilled] = useState(new Set())

  const p = PUZZLES[pi]
  const area = p.w * p.h
  const done = filled.size === area
  const isLast = pi === PUZZLES.length - 1
  const finished = done && isLast

  const tap = (c, r) => {
    const k = `${c},${r}`
    if (filled.has(k)) return
    const next = new Set(filled); next.add(k)
    setFilled(next)
    if (next.size === area) {
      setTimeout(() => {
        if (isLast) onComplete?.()
        else { setPi(pi + 1); setFilled(new Set()) }
      }, 1200)
    }
  }

  const pad = 16
  const svgW = p.w * UNIT + pad * 2
  const svgH = p.h * UNIT + pad * 2

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Fill It Up" onHome={onHome} right={`${pi + 1}/${PUZZLES.length}`} />
      <Celebrate show={done} />

      <p className="text-center text-ink-soft text-sm px-6 mb-1">
        {done ? `Area = ${area} squares! That's ${p.w} × ${p.h}.` : 'Tap every square to cover the shape'}
      </p>
      <p className="text-center font-display text-2xl mb-3" style={{ color: p.color }}>
        {filled.size} {filled.size === 1 ? 'square' : 'squares'}
      </p>

      <div className="flex-1 flex items-center justify-center px-6">
        <svg width={svgW} height={svgH} className="max-w-full">
          {Array.from({ length: p.h }).map((_, r) =>
            Array.from({ length: p.w }).map((_, c) => {
              const k = `${c},${r}`
              const on = filled.has(k)
              return (
                <rect
                  key={k}
                  x={pad + c * UNIT + 1.5} y={pad + r * UNIT + 1.5}
                  width={UNIT - 3} height={UNIT - 3} rx="4"
                  fill={on ? p.color : p.color + '15'}
                  stroke={p.color + '55'} strokeWidth="1.5"
                  style={{ cursor: 'pointer' }}
                  onClick={() => tap(c, r)}
                />
              )
            })
          )}
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
