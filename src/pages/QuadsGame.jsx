import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

// The quadrilateral family — each has 4 sides, but different rules.
const QUADS = [
  { id: 'square', name: 'Square', color: '#38BDF8', pts: '25,25 75,25 75,75 25,75',
    rule: '4 equal sides and 4 right-angle corners. The tidiest quad!' },
  { id: 'rectangle', name: 'Rectangle', color: '#4ADE80', pts: '18,32 82,32 82,68 18,68',
    rule: '4 right-angle corners, with two long sides and two short sides.' },
  { id: 'rhombus', name: 'Rhombus', color: '#FB7185', pts: '50,20 78,50 50,80 22,50',
    rule: '4 equal sides like a square, but pushed over — a diamond!' },
  { id: 'parallelogram', name: 'Parallelogram', color: '#FB923C', pts: '30,32 82,32 70,68 18,68',
    rule: 'Opposite sides are parallel and equal, leaning to one side.' },
  { id: 'trapezoid', name: 'Trapezoid', color: '#A78BFA', pts: '32,32 68,32 82,68 18,68',
    rule: 'Just ONE pair of parallel sides. A little lopsided!' },
]

export default function QuadsGame({ onHome, onComplete }) {
  const [i, setI] = useState(0)
  const q = QUADS[i]
  const isLast = i === QUADS.length - 1

  const next = () => { if (isLast) onComplete?.(); else setI(i + 1) }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="The Quad Family" onHome={onHome} right={`${i + 1}/${QUADS.length}`} />
      <Celebrate show={isLast} />

      <div className="flex justify-center gap-1.5 mb-2">
        {QUADS.map((_, k) => (
          <div key={k} className={`h-1.5 rounded-full transition-all ${k <= i ? 'w-5' : 'w-1.5 bg-ink/10'}`}
            style={k <= i ? { backgroundColor: q.color } : {}} />
        ))}
      </div>

      <p className="text-center text-ink-soft text-xs px-6 mb-2">Every quadrilateral has 4 sides — but each has its own rule!</p>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center">
            <div className="bg-white/70 rounded-3xl p-5 shadow-sm mb-4">
              <motion.svg viewBox="0 0 100 100" className="w-48"
                animate={{ rotate: [0, -2, 2, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <polygon points={q.pts} fill={q.color + '30'} stroke={q.color} strokeWidth="3.5" strokeLinejoin="round" />
              </motion.svg>
            </div>
            <h2 className="font-display text-3xl mb-2" style={{ color: q.color }}>{q.name}</h2>
            <p className="text-ink text-base max-w-sm leading-relaxed">{q.rule}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 px-6 pb-8 max-w-md mx-auto w-full">
        {i > 0 && (
          <button onClick={() => setI(i - 1)}
            className="px-6 py-3 rounded-full border-2 border-sky/40 text-sky-dark font-medium cursor-pointer hover:border-sky transition-colors">
            Back
          </button>
        )}
        <button onClick={next}
          className="flex-1 text-white font-display text-lg py-3 rounded-full cursor-pointer shadow-md"
          style={{ background: `linear-gradient(to bottom, ${q.color}, ${q.color}cc)` }}>
          {isLast ? 'Finish 🎉' : 'Next'}
        </button>
      </div>
    </div>
  )
}
