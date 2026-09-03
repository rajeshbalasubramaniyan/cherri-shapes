import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

const TYPES = {
  equilateral: { label: 'All Equal', sub: 'equilateral', color: '#EF4444' },
  isosceles: { label: 'Two Equal', sub: 'isosceles', color: '#38BDF8' },
  scalene: { label: 'All Different', sub: 'scalene', color: '#4ADE80' },
}

// Each round: vertices + the correct type. Tick marks show equal sides.
const ROUNDS = [
  { type: 'equilateral', v: [[50,14],[86,78],[14,78]] },
  { type: 'isosceles', v: [[50,12],[78,82],[22,82]] },
  { type: 'scalene', v: [[30,18],[88,70],[16,84]] },
  { type: 'isosceles', v: [[50,16],[84,80],[16,80]] },
  { type: 'scalene', v: [[24,22],[82,40],[40,84]] },
  { type: 'equilateral', v: [[50,16],[80,72],[20,72]] },
]

export default function TrianglesGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const r = ROUNDS[round]
  const answer = r.type
  const color = TYPES[answer].color
  const isLast = round === ROUNDS.length - 1
  const finished = feedback === 'correct' && isLast

  const pts = r.v.map(p => p.join(',')).join(' ')

  const choose = (type) => {
    if (feedback === 'correct') return
    if (type === answer) {
      setFeedback('correct')
      setTimeout(() => {
        if (isLast) onComplete?.()
        else { setRound(round + 1); setFeedback(null) }
      }, 1100)
    } else {
      setFeedback(type)
      setTimeout(() => setFeedback(null), 500)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Triangle Types" onHome={onHome} right={`${round + 1}/${ROUNDS.length}`} />
      <Celebrate show={feedback === 'correct'} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {feedback === 'correct'
          ? `Yes! An ${TYPES[answer].sub} triangle.`
          : 'Look at the sides — what kind of triangle?'}
      </p>

      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div key={round} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm">
          <svg viewBox="0 0 100 100" className="w-52">
            <polygon points={pts} fill={(feedback === 'correct' ? color : '#94A3B8') + '33'}
              stroke={feedback === 'correct' ? color : '#475569'} strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pb-8 max-w-md mx-auto w-full">
        {Object.entries(TYPES).map(([id, t]) => {
          const state = feedback === 'correct' && id === answer ? 'correct'
            : feedback === id ? 'wrong' : 'idle'
          return (
            <motion.button key={id} whileTap={{ scale: 0.94 }}
              animate={state === 'wrong' ? { x: [0, -6, 6, 0] } : {}}
              onClick={() => choose(id)}
              className="rounded-2xl py-4 flex flex-col items-center gap-1 cursor-pointer transition-colors"
              style={{
                backgroundColor: state === 'correct' ? t.color : state === 'wrong' ? '#fecaca' : t.color + '18',
                color: state === 'correct' ? '#fff' : t.color,
              }}>
              <span className="font-display text-base leading-tight text-center">{t.label}</span>
              <span className="text-[9px]" style={{ color: state === 'correct' ? '#fff' : '#475569' }}>{t.sub}</span>
            </motion.button>
          )
        })}
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
