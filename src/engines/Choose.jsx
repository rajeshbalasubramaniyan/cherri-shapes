import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { shuffle, Progress, NextButton, Explain, Prompt } from './shared'

// Picture quiz. Round shape: { q?, figure?: JSX, emoji?, text?, options, answer, explain? }
export default function Choose({ title, color, content, onHome, onComplete }) {
  const rounds = content.rounds
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState(null)
  const [solved, setSolved] = useState(false)

  const r = rounds[i]
  const isLast = i === rounds.length - 1
  const options = useMemo(() => (content.keepOrder || r.keepOrder ? r.options : shuffle(r.options)), [i])
  const longOptions = options.some(o => String(o).length > 10)
  const emojiOptions = options.every(o => /\p{Extended_Pictographic}/u.test(o) && String(o).length <= 4)

  const choose = (opt) => {
    if (solved) return
    if (opt === r.answer) setSolved(true)
    else { setWrong(opt); setTimeout(() => setWrong(null), 600) }
  }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setSolved(false); setWrong(null)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${rounds.length}`} />
      <Progress total={rounds.length} current={i} color={color} />
      <Celebrate show={solved} />
      <Prompt>{r.q || content.prompt}</Prompt>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {r.figure && <div className="bg-white/70 rounded-3xl p-3 shadow-sm">{r.figure}</div>}
        {r.emoji && <div className="text-6xl mb-2 tracking-wider">{r.emoji}</div>}
        {r.text && <div className={`font-display text-ink max-w-sm mt-3 ${r.text.length > 28 ? 'text-xl' : 'text-3xl'}`}>{r.text}</div>}
        {solved && <Explain text={r.explain} color={color} />}
      </div>

      {!solved ? (
        <div className="px-4 pb-8 max-w-md mx-auto w-full">
          <div className={`grid gap-3 ${longOptions ? 'grid-cols-1 sm:grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {options.map(opt => (
              <motion.button key={opt} whileTap={{ scale: 0.94 }}
                animate={wrong === opt ? { x: [0, -6, 6, -6, 0] } : {}}
                onClick={() => choose(opt)}
                className={`rounded-2xl py-3.5 px-3 font-display cursor-pointer shadow-sm transition-colors text-ink ${emojiOptions ? 'text-4xl' : longOptions ? 'text-lg' : 'text-2xl'}`}
                style={{ backgroundColor: wrong === opt ? '#FECACA' : '#fff' }}>
                {opt}
              </motion.button>
            ))}
          </div>
          {wrong && <p className="text-center text-ink-soft/70 text-xs mt-2">Not quite. Try another!</p>}
        </div>
      ) : (
        <NextButton onClick={next} last={isLast} />
      )}
    </div>
  )
}
