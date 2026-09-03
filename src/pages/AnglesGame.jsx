import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

const TYPES = {
  acute: { label: 'Sharp', sub: 'acute · less than 90°', color: '#FB7185', emoji: '📐' },
  right: { label: 'Right', sub: 'exactly 90°', color: '#38BDF8', emoji: '🟦' },
  obtuse: { label: 'Wide', sub: 'obtuse · more than 90°', color: '#FB923C', emoji: '📐' },
}

function classify(deg) {
  if (deg === 90) return 'right'
  return deg < 90 ? 'acute' : 'obtuse'
}

const ROUNDS = [40, 90, 130, 25, 90, 155]

function AngleSvg({ deg, color }) {
  // one ray along +x, the other rotated by deg (counter-clockwise, screen y-down so negate)
  const cx = 60, cy = 90, len = 70
  const rad = (deg * Math.PI) / 180
  const x2 = cx + len * Math.cos(-rad)
  const y2 = cy + len * Math.sin(-rad)
  const isRight = deg === 90
  return (
    <svg viewBox="0 0 140 110" className="w-56">
      {/* arc */}
      <path
        d={`M ${cx + 22} ${cy} A 22 22 0 0 0 ${cx + 22 * Math.cos(-rad)} ${cy + 22 * Math.sin(-rad)}`}
        fill="none" stroke={color} strokeWidth="2" opacity="0.5"
      />
      {isRight && <rect x={cx} y={cy - 12} width="12" height="12" fill="none" stroke={color} strokeWidth="2" />}
      <line x1={cx} y1={cy} x2={cx + len} y2={cy} stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4.5" fill={color} />
    </svg>
  )
}

export default function AnglesGame({ onHome, onComplete }) {
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'right' | 'wrong'
  const [score, setScore] = useState(0)

  const deg = ROUNDS[round]
  const answer = classify(deg)
  const color = TYPES[answer].color
  const isLast = round === ROUNDS.length - 1
  const finished = feedback === 'correct' && isLast

  const choose = (type) => {
    if (feedback === 'correct') return
    if (type === answer) {
      setFeedback('correct')
      setScore(s => s + 1)
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
      <GameHeader title="Angle Explorer" onHome={onHome} right={`${round + 1}/${ROUNDS.length}`} />
      <Celebrate show={feedback === 'correct'} />

      <p className="text-center text-ink-soft text-sm px-6 mb-2">
        {feedback === 'correct' ? `Yes! That's a ${TYPES[answer].label.toLowerCase()} angle.` : 'What kind of angle is this?'}
      </p>

      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          key={round}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm"
        >
          <AngleSvg deg={deg} color={feedback === 'correct' ? color : '#475569'} />
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pb-8 max-w-md mx-auto w-full">
        {Object.entries(TYPES).map(([id, t]) => {
          const state =
            feedback === 'correct' && id === answer ? 'correct'
            : feedback === id ? 'wrong' : 'idle'
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.94 }}
              animate={state === 'wrong' ? { x: [0, -6, 6, 0] } : {}}
              onClick={() => choose(id)}
              className="rounded-2xl py-4 flex flex-col items-center gap-1 cursor-pointer transition-colors"
              style={{
                backgroundColor: state === 'correct' ? t.color : state === 'wrong' ? '#fecaca' : t.color + '18',
                color: state === 'correct' ? '#fff' : t.color,
              }}
            >
              <span className="font-display text-lg">{t.label}</span>
              <span className="text-[9px] opacity-80" style={{ color: state === 'correct' ? '#fff' : '#475569' }}>{t.sub}</span>
            </motion.button>
          )
        })}
      </div>

      {finished && (
        <div className="px-6 pb-8 max-w-md mx-auto w-full">
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onHome}
            className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
          >
            Back to Journey →
          </motion.button>
        </div>
      )}
    </div>
  )
}
