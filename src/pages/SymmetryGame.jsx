import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'

// Left half is filled; the child taps right-half cells to mirror it across the line.
const GRID = 6 // columns (0..2 left, 3..5 right)
const ROWS = 6
const COLOR = '#4ADE80'

// Puzzle patterns: filled cells on the LEFT half (col 0..2)
const PUZZLES = [
  { name: 'Butterfly', left: [[1,0],[2,0],[0,1],[1,1],[2,1],[1,2],[2,2],[2,3],[1,4],[2,4]] },
  { name: 'Heart', left: [[1,1],[2,1],[0,2],[1,2],[2,2],[1,3],[2,3],[2,4]] },
  { name: 'Tree', left: [[2,0],[1,1],[2,1],[0,2],[1,2],[2,2],[2,3],[2,4],[2,5]] },
]

const key = (c, r) => `${c},${r}`

export default function SymmetryGame({ onHome, onComplete }) {
  const [puzzle, setPuzzle] = useState(0)
  const [tapped, setTapped] = useState(new Set())

  const p = PUZZLES[puzzle]
  const leftSet = new Set(p.left.map(([c, r]) => key(c, r)))
  // required right cells = mirror of left across the vertical line between col 2 and 3
  const required = new Set(p.left.map(([c, r]) => key(GRID - 1 - c, r)))

  const done = [...required].every(k => tapped.has(k)) && tapped.size === required.size

  const toggle = (c, r) => {
    if (c < GRID / 2) return // only right half is interactive
    const k = key(c, r)
    const next = new Set(tapped)
    next.has(k) ? next.delete(k) : next.add(k)
    setTapped(next)
    const req = new Set(p.left.map(([lc, lr]) => key(GRID - 1 - lc, lr)))
    if ([...req].every(x => next.has(x)) && next.size === req.size) {
      setTimeout(() => {
        if (puzzle < PUZZLES.length - 1) { setPuzzle(puzzle + 1); setTapped(new Set()) }
        else onComplete?.()
      }, 1100)
    }
  }

  const finished = done && puzzle === PUZZLES.length - 1

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title="Mirror Magic" onHome={onHome} right={`${puzzle + 1}/${PUZZLES.length}`} />
      <Celebrate show={done} />

      <p className="text-center text-ink-soft text-sm px-6 mb-4">
        {done ? `A perfect ${p.name}! 🦋` : `Complete the ${p.name} — tap to mirror the other half`}
      </p>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative bg-white/60 rounded-2xl p-3 shadow-sm">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: 3 }}>
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: GRID }).map((_, c) => {
                const k = key(c, r)
                const isLeft = c < GRID / 2
                const filled = isLeft ? leftSet.has(k) : tapped.has(k)
                const isMirrorLine = c === GRID / 2
                return (
                  <button
                    key={k}
                    onClick={() => toggle(c, r)}
                    disabled={isLeft}
                    className="rounded-md transition-colors"
                    style={{
                      width: 40, height: 40,
                      backgroundColor: filled ? COLOR : isLeft ? '#f1f5f9' : '#e2e8f0',
                      cursor: isLeft ? 'default' : 'pointer',
                      boxShadow: isMirrorLine ? 'inset 2px 0 0 #38BDF8' : undefined,
                    }}
                  />
                )
              })
            )}
          </div>
          {/* mirror line label */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] text-sky-dark bg-white px-1.5 rounded-full shadow-sm">
            mirror line
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        {finished && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.96 }} onClick={onHome}
            className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md"
          >
            Back to Journey →
          </motion.button>
        )}
      </div>
    </div>
  )
}
