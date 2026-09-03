import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShapeCharacter from '../components/ShapeCharacter'
import { SHAPES, SHAPE_ORDER } from '../shapes/shapeData'

export default function MeetShapesPage({ onHome, onPlay }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const shape = SHAPES[SHAPE_ORDER[index]]

  const go = (delta) => {
    const next = index + delta
    if (next < 0 || next >= SHAPE_ORDER.length) return
    setDir(delta)
    setIndex(next)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-sky-dark/70 hover:text-sky-dark cursor-pointer text-sm">
          ← Home
        </button>
        <h3 className="font-display text-lg text-sky-dark">Meet the Shapes</h3>
        <div className="w-12" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={shape.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <ShapeCharacter shape={shape} size={200} float />
            <h2 className="font-display text-4xl mt-6 mb-1" style={{ color: shape.colorHex }}>
              {shape.name}
            </h2>
            <p className="text-ink-soft text-sm mb-4">the {shape.label}</p>
            <p className="text-ink text-base max-w-sm leading-relaxed mb-4">
              {shape.personality}
            </p>
            <div className="flex gap-3 justify-center">
              <div className="bg-white/70 rounded-2xl px-4 py-2 shadow-sm">
                <p className="font-display text-2xl" style={{ color: shape.colorHex }}>{shape.corners}</p>
                <p className="text-ink-soft text-[10px]">corners</p>
              </div>
              <div className="bg-white/70 rounded-2xl px-4 py-2 shadow-sm">
                <p className="font-display text-2xl" style={{ color: shape.colorHex }}>{shape.sides}</p>
                <p className="text-ink-soft text-[10px]">sides</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 pb-2">
        {SHAPE_ORDER.map((id, i) => (
          <button
            key={id}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-6 bg-sky-dark' : 'w-2 bg-sky-dark/25'
            }`}
          />
        ))}
      </div>

      <div className="flex gap-3 px-6 pb-8 max-w-md mx-auto w-full">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="px-6 py-3 rounded-full border-2 border-sky/40 text-sky-dark font-medium cursor-pointer disabled:opacity-30 hover:border-sky transition-colors"
        >
          Back
        </button>
        {index < SHAPE_ORDER.length - 1 ? (
          <button
            onClick={() => go(1)}
            className="flex-1 bg-gradient-to-b from-sky to-sky-dark text-white font-display text-lg py-3 rounded-full cursor-pointer shadow-md"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="flex-1 bg-gradient-to-b from-sunny to-tangerine text-white font-display text-lg py-3 rounded-full cursor-pointer shadow-md"
          >
            Play a Game! ✨
          </button>
        )}
      </div>
    </div>
  )
}
