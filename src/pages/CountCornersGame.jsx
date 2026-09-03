import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShapeCharacter from '../components/ShapeCharacter'
import { SHAPES } from '../shapes/shapeData'

// Corner-counting level order (circle handled with its own "no corners" beat)
const LEVEL_ORDER = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'circle']

export default function CountCornersGame({ onHome }) {
  const [level, setLevel] = useState(0)
  const [tagged, setTagged] = useState([])
  const [done, setDone] = useState(false)

  const shape = SHAPES[LEVEL_ORDER[level]]
  const isCircle = shape.curved
  const total = shape.corners

  const count = tagged.length
  const complete = isCircle ? done : count === total

  const handleCorner = (i) => {
    if (tagged.includes(i)) return
    const next = [...tagged, i]
    setTagged(next)
    if (next.length === total) {
      setTimeout(() => setDone(true), 400)
    }
  }

  const handleCircle = () => setDone(true)

  const nextLevel = () => {
    if (level < LEVEL_ORDER.length - 1) {
      setLevel(level + 1)
      setTagged([])
      setDone(false)
    } else {
      onHome()
    }
  }

  const stars = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 320,
      delay: Math.random() * 0.3,
      emoji: ['⭐', '✨', '🌟', '🎉'][i % 4],
    })),
    [level, complete]
  )

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-sky-dark/70 hover:text-sky-dark cursor-pointer text-sm">
          ← Home
        </button>
        <h3 className="font-display text-lg text-sky-dark">Count the Corners</h3>
        <div className="text-sky-dark/50 text-xs">{level + 1}/{LEVEL_ORDER.length}</div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-2">
        {LEVEL_ORDER.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i <= level ? 'w-5 bg-sky' : 'w-1.5 bg-sky/20'}`} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          key={`prompt-${level}-${complete}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl sm:text-3xl mb-1"
          style={{ color: shape.colorHex }}
        >
          {complete
            ? isCircle ? 'Sunny has NO corners!' : `${shape.name} has ${total} corners!`
            : isCircle ? `Say hi to ${shape.name}!` : `Tap each corner of ${shape.name}`}
        </motion.p>
        <p className="text-ink-soft text-sm mb-6 h-5">
          {complete ? shape.fact : isCircle ? 'Circles are perfectly round — tap Sunny!' : `Counted ${count} of ${total}`}
        </p>

        <div className="relative">
          {/* Live count badge */}
          {!isCircle && (
            <motion.div
              key={count}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-4 -right-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <span className="font-display text-2xl" style={{ color: shape.colorHex }}>{count}</span>
            </motion.div>
          )}

          <motion.div
            animate={complete ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.5 }}
            onClick={isCircle && !done ? handleCircle : undefined}
            style={isCircle && !done ? { cursor: 'pointer' } : undefined}
          >
            <ShapeCharacter
              shape={shape}
              size={240}
              float={complete}
              interactiveCorners={!isCircle && !complete}
              taggedCorners={tagged}
              onCornerTap={handleCorner}
            />
          </motion.div>

          {/* Celebration */}
          <AnimatePresence>
            {complete && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {stars.map(s => (
                  <motion.span
                    key={s.id}
                    className="absolute text-2xl"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], x: s.x, y: s.y, scale: [0, 1.2, 0.8] }}
                    transition={{ duration: 1.1, delay: s.delay }}
                  >
                    {s.emoji}
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        <AnimatePresence>
          {complete && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.96 }}
              onClick={nextLevel}
              className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
            >
              {level < LEVEL_ORDER.length - 1 ? 'Next Shape! →' : 'Finish 🎉'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
