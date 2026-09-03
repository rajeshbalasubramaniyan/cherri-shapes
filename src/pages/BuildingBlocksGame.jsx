import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

// Teaches the atoms of geometry: point -> segment -> ray -> line -> parallel -> perpendicular.
// Each step: a tappable/animated demo + kid-friendly definition.
const STEPS = [
  {
    id: 'point',
    name: 'Point',
    color: '#FB7185',
    def: 'A point is one exact spot. We mark it with a tiny dot and give it a name, like point A.',
    tapHint: 'Tap anywhere to place a point!',
  },
  {
    id: 'segment',
    name: 'Line Segment',
    color: '#38BDF8',
    def: 'A line segment is a straight path between TWO points. It has two ends.',
    tapHint: 'A segment joins two points — tap Next to see!',
  },
  {
    id: 'ray',
    name: 'Ray',
    color: '#FB923C',
    def: 'A ray starts at one point and shoots off forever in one direction. Like a sunbeam!',
    tapHint: 'One end, one arrow going forever.',
  },
  {
    id: 'line',
    name: 'Line',
    color: '#A78BFA',
    def: 'A line goes on forever in BOTH directions. It has arrows on both ends.',
    tapHint: 'No endpoints — it never stops!',
  },
  {
    id: 'parallel',
    name: 'Parallel Lines',
    color: '#4ADE80',
    def: 'Parallel lines run side by side and NEVER meet, like train tracks.',
    tapHint: 'Always the same distance apart.',
  },
  {
    id: 'perpendicular',
    name: 'Perpendicular Lines',
    color: '#0284C7',
    def: 'Perpendicular lines cross and make a perfect square corner — a right angle!',
    tapHint: 'They meet at a right angle.',
  },
]

function Diagram({ step, points, onCanvasTap }) {
  const c = step.color
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-sm" onClick={onCanvasTap} style={{ cursor: step.id === 'point' ? 'crosshair' : 'default' }}>
      {step.id === 'point' && points.map((p, i) => (
        <g key={i}>
          <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx={p.x} cy={p.y} r="5" fill={c} />
          <text x={p.x + 8} y={p.y - 6} fontSize="11" fill={c} fontWeight="bold">
            {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}

      {step.id === 'segment' && (
        <g>
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
            x1="40" y1="60" x2="160" y2="60" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="60" r="5" fill={c} />
          <circle cx="160" cy="60" r="5" fill={c} />
          <text x="34" y="50" fontSize="11" fill={c} fontWeight="bold">A</text>
          <text x="158" y="50" fontSize="11" fill={c} fontWeight="bold">B</text>
        </g>
      )}

      {step.id === 'ray' && (
        <g>
          <line x1="40" y1="60" x2="176" y2="60" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="60" r="5" fill={c} />
          <path d="M176 60 L166 53 M176 60 L166 67" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="34" y="50" fontSize="11" fill={c} fontWeight="bold">A</text>
        </g>
      )}

      {step.id === 'line' && (
        <g>
          <line x1="24" y1="60" x2="176" y2="60" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <path d="M24 60 L34 53 M24 60 L34 67" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M176 60 L166 53 M176 60 L166 67" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}

      {step.id === 'parallel' && (
        <g>
          <line x1="30" y1="45" x2="170" y2="45" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="80" x2="170" y2="80" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <path d="M30 45 L40 39 M30 45 L40 51 M170 45 L160 39 M170 45 L160 51" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M30 80 L40 74 M30 80 L40 86 M170 80 L160 74 M170 80 L160 86" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {step.id === 'perpendicular' && (
        <g>
          <line x1="100" y1="18" x2="100" y2="102" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="60" x2="170" y2="60" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <rect x="100" y="48" width="12" height="12" fill="none" stroke={c} strokeWidth="2" />
        </g>
      )}
    </svg>
  )
}

export default function BuildingBlocksGame({ onHome, onComplete }) {
  const [step, setStep] = useState(0)
  const [points, setPoints] = useState([])
  const cur = STEPS[step]
  const isLast = step === STEPS.length - 1

  const handleCanvasTap = (e) => {
    if (cur.id !== 'point' || points.length >= 3) return
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 200
    const y = ((e.clientY - rect.top) / rect.height) * 120
    setPoints([...points, { x, y }])
  }

  const next = () => {
    if (isLast) { onComplete?.(); return }
    setStep(step + 1)
    setPoints([])
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Building Blocks" onHome={onHome} right={`${step + 1}/${STEPS.length}`} />

      <div className="flex justify-center gap-1.5 mb-4">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'w-5' : 'w-1.5 bg-ink/10'}`}
            style={i <= step ? { backgroundColor: cur.color } : {}} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center w-full"
          >
            <h2 className="font-display text-3xl mb-2" style={{ color: cur.color }}>{cur.name}</h2>

            <div className="bg-white/70 rounded-3xl p-4 shadow-sm mb-4 w-full max-w-sm flex justify-center">
              <Diagram step={cur} points={points} onCanvasTap={handleCanvasTap} />
            </div>

            <p className="text-ink text-base max-w-sm leading-relaxed mb-1">{cur.def}</p>
            <p className="text-ink-soft text-xs">
              {cur.id === 'point' && points.length < 3 ? cur.tapHint : cur.id === 'point' ? 'Great placing!' : cur.tapHint}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 px-6 pb-8 max-w-md mx-auto w-full">
        {step > 0 && (
          <button onClick={() => { setStep(step - 1); setPoints([]) }}
            className="px-6 py-3 rounded-full border-2 border-sky/40 text-sky-dark font-medium cursor-pointer hover:border-sky transition-colors">
            Back
          </button>
        )}
        <button onClick={next}
          className="flex-1 text-white font-display text-lg py-3 rounded-full cursor-pointer shadow-md"
          style={{ background: `linear-gradient(to bottom, ${cur.color}, ${cur.color}cc)` }}>
          {isLast ? 'Finish 🎉' : 'Next'}
        </button>
      </div>
    </div>
  )
}
