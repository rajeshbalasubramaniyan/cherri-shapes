import { useState } from 'react'
import { motion } from 'framer-motion'
import Celebrate, { GameHeader } from '../components/Celebrate'
import { Progress, NextButton, Explain, Prompt } from './shared'

// Tap the grid point at (x, y). Round shape: { x, y, thing?, explain? }
export default function Plot({ title, color, content, onHome, onComplete }) {
  const rounds = content.rounds
  const size = content.size || 6
  const [i, setI] = useState(0)
  const [wrong, setWrong] = useState(null)
  const [solved, setSolved] = useState(false)

  const r = rounds[i]
  const isLast = i === rounds.length - 1
  const u = 40, ox = 34, oy = 32 + size * u
  const X = x => ox + x * u, Y = y => oy - y * u

  const tap = (x, y) => {
    if (solved) return
    if (x === r.x && y === r.y) setSolved(true)
    else { setWrong([x, y]); setTimeout(() => setWrong(null), 700) }
  }

  const next = () => {
    if (isLast) { onComplete(); return }
    setI(i + 1); setSolved(false); setWrong(null)
  }

  const W = ox + size * u + 20, H = oy + 30

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <GameHeader title={title} onHome={onHome} right={`${i + 1}/${rounds.length}`} />
      <Progress total={rounds.length} current={i} color={color} />
      <Celebrate show={solved} />
      <Prompt>{content.prompt}</Prompt>
      <p className="text-center font-display text-3xl mb-2" style={{ color }}>
        {r.thing ? `${r.thing} ` : ''}({r.x}, {r.y})
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} className="max-w-full bg-white/70 rounded-3xl shadow-sm">
          {Array.from({ length: size + 1 }).map((_, k) => (
            <g key={k}>
              <line x1={X(k)} y1={Y(0)} x2={X(k)} y2={Y(size)} stroke="#CBD5E1" />
              <line x1={X(0)} y1={Y(k)} x2={X(size)} y2={Y(k)} stroke="#CBD5E1" />
              <text x={X(k)} y={oy + 18} textAnchor="middle" fontSize="13" fill="#64748B">{k}</text>
              {k > 0 && <text x={ox - 10} y={Y(k) + 4} textAnchor="end" fontSize="13" fill="#64748B">{k}</text>}
            </g>
          ))}
          <line x1={X(0)} y1={Y(0)} x2={X(size) + 8} y2={Y(0)} stroke="#334155" strokeWidth="2.5" />
          <line x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(size) - 8} stroke="#334155" strokeWidth="2.5" />
          <text x={X(size) + 10} y={Y(0) + 4} fontSize="12" fontWeight="700" fill="#334155">x</text>
          <text x={X(0) - 4} y={Y(size) - 12} fontSize="12" fontWeight="700" fill="#334155">y</text>

          {solved && (
            <g>
              <line x1={X(0)} y1={Y(0)} x2={X(r.x)} y2={Y(0)} stroke={color} strokeWidth="4" strokeLinecap="round" />
              <line x1={X(r.x)} y1={Y(0)} x2={X(r.x)} y2={Y(r.y)} stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray="6 5" />
            </g>
          )}

          {Array.from({ length: size + 1 }).flatMap((_, x) => Array.from({ length: size + 1 }).map((_, y) => {
            const hit = solved && x === r.x && y === r.y
            const miss = wrong && wrong[0] === x && wrong[1] === y
            return (
              <g key={`${x},${y}`} onClick={() => tap(x, y)} style={{ cursor: 'pointer' }} data-pt={`${x},${y}`}>
                <circle cx={X(x)} cy={Y(y)} r="16" fill="transparent" />
                <motion.circle cx={X(x)} cy={Y(y)} r={hit ? 11 : miss ? 9 : 4}
                  fill={hit ? '#16A34A' : miss ? '#EF4444' : '#94A3B8'} />
                {hit && r.thing && <text x={X(x)} y={Y(y) - 14} textAnchor="middle" fontSize="20">{r.thing}</text>}
              </g>
            )
          }))}
        </svg>
        {wrong && <p className="text-ink-soft/80 text-xs mt-2">That's ({wrong[0]}, {wrong[1]}). Go along first, then up.</p>}
        {solved && <Explain text={r.explain || `Along ${r.x}, then up ${r.y}. The first number is always along the corridor.`} color={color} />}
      </div>

      {solved && <NextButton onClick={next} last={isLast} />}
    </div>
  )
}
