import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Solid3D from '../components/Solid3D'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { SOLIDS, SOLID_ORDER } from '../shapes/solidData'
import { SHAPES } from '../shapes/shapeData'
import ShapeCharacter from '../components/ShapeCharacter'

export default function SolidsGame({ onHome, onComplete }) {
  const [index, setIndex] = useState(0)
  const solid = SOLIDS[SOLID_ORDER[index]]
  const flat = SHAPES[solid.from]
  const isLast = index === SOLID_ORDER.length - 1

  const next = () => {
    if (isLast) onComplete?.()
    else setIndex(index + 1)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="3D Shapes" onHome={onHome} right={`${index + 1}/${SOLID_ORDER.length}`} />
      <Celebrate show={isLast} />

      <div className="flex justify-center gap-1.5 mb-2">
        {SOLID_ORDER.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i <= index ? 'w-5' : 'w-1.5 bg-ink/10'}`}
            style={i <= index ? { backgroundColor: solid.color } : {}} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={solid.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center w-full">

            {/* flat -> solid */}
            <div className="flex items-center gap-3 mb-2">
              <div className="opacity-70"><ShapeCharacter shape={flat} size={60} face={false} /></div>
              <span className="text-2xl text-ink-soft">→</span>
              <motion.div animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Solid3D id={solid.id} color={solid.color} size={150} />
              </motion.div>
            </div>

            <h2 className="font-display text-3xl mb-1" style={{ color: solid.color }}>
              {solid.name} <span className="text-ink-soft text-lg">the {solid.label}</span> {solid.example}
            </h2>
            <p className="text-ink text-base max-w-sm leading-relaxed mb-4">{solid.fact}</p>

            <div className="flex gap-2 justify-center">
              {[['Faces', solid.faces], ['Edges', solid.edges], ['Corners', solid.corners]].map(([lbl, n]) => (
                <div key={lbl} className="bg-white/70 rounded-2xl px-4 py-2 shadow-sm">
                  <p className="font-display text-2xl" style={{ color: solid.color }}>{n}</p>
                  <p className="text-ink-soft text-[10px]">{lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 px-6 pb-8 max-w-md mx-auto w-full">
        {index > 0 && (
          <button onClick={() => setIndex(index - 1)}
            className="px-6 py-3 rounded-full border-2 border-sky/40 text-sky-dark font-medium cursor-pointer hover:border-sky transition-colors">
            Back
          </button>
        )}
        <button onClick={next}
          className="flex-1 text-white font-display text-lg py-3 rounded-full cursor-pointer shadow-md"
          style={{ background: `linear-gradient(to bottom, ${solid.color}, ${solid.color}cc)` }}>
          {isLast ? 'Finish 🎉' : 'Next'}
        </button>
      </div>
    </div>
  )
}
