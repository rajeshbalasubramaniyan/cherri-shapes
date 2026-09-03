import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ShapeCharacter from '../components/ShapeCharacter'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { SHAPES } from '../shapes/shapeData'

// Three bins; drag each shape into the matching bin.
const BINS = ['circle', 'triangle', 'square']
const ROUND = [
  'triangle', 'circle', 'square', 'triangle', 'circle', 'square',
]

export default function SortGame({ onHome, onComplete }) {
  const [placed, setPlaced] = useState({})
  const [wrong, setWrong] = useState(null)
  const binRefs = useRef({})

  const remaining = ROUND.map((s, i) => ({ id: i, shape: s })).filter(x => !placed[x.id])
  const done = remaining.length === 0

  const handleDragEnd = (itemId, shapeId, info) => {
    const { x, y } = info.point
    for (const bin of BINS) {
      const el = binRefs.current[bin]
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        if (bin === shapeId) {
          const next = { ...placed, [itemId]: bin }
          setPlaced(next)
          if (Object.keys(next).length === ROUND.length) {
            setTimeout(() => onComplete?.(), 900)
          }
        } else {
          setWrong(itemId)
          setTimeout(() => setWrong(null), 500)
        }
        return
      }
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Sort the Shapes" onHome={onHome} right={`${Object.keys(placed).length}/${ROUND.length}`} />
      <Celebrate show={done} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {done ? 'You sorted them all! 🎉' : 'Drag each shape to its matching bin'}
      </p>

      {/* Shape pile */}
      <div className="flex-1 flex flex-wrap items-center justify-center gap-2 px-6 content-center min-h-[240px]">
        {remaining.map(item => (
          <motion.div
            key={item.id}
            drag
            dragSnapToOrigin
            whileDrag={{ scale: 1.15, zIndex: 50 }}
            onDragEnd={(e, info) => handleDragEnd(item.id, item.shape, info)}
            animate={wrong === item.id ? { x: [0, -8, 8, -8, 0] } : {}}
            className="cursor-grab active:cursor-grabbing touch-none"
          >
            <ShapeCharacter shape={SHAPES[item.shape]} size={78} face={false} />
          </motion.div>
        ))}
        {done && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <ShapeCharacter shape={SHAPES.pentagon} size={120} float />
          </motion.div>
        )}
      </div>

      {/* Bins */}
      <div className="grid grid-cols-3 gap-3 px-4 pb-8">
        {BINS.map(bin => {
          const count = Object.values(placed).filter(b => b === bin).length
          return (
            <div
              key={bin}
              ref={el => (binRefs.current[bin] = el)}
              className="rounded-2xl border-3 border-dashed flex flex-col items-center justify-center py-4 gap-1"
              style={{ borderColor: SHAPES[bin].colorHex + '80', backgroundColor: SHAPES[bin].colorHex + '11', borderWidth: 3 }}
            >
              <ShapeCharacter shape={SHAPES[bin]} size={44} face={false} />
              <span className="text-[10px] text-ink-soft font-medium">{SHAPES[bin].label}s</span>
              {count > 0 && (
                <span className="text-xs font-display" style={{ color: SHAPES[bin].colorHex }}>{count}</span>
              )}
            </div>
          )
        })}
      </div>

      {done && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.96 }}
            onClick={onHome}
            className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
          >
            Back to Journey →
          </motion.button>
        </div>
      )}
    </div>
  )
}
