import { motion } from 'framer-motion'

export default function BandMap({ band, progress, onPlay, onChangeBand, onHome }) {
  const isDone = (l) => !!progress[`${band.id}/${l.id}`]
  const nextIdx = band.levels.findIndex(l => !isDone(l))
  const doneCount = band.levels.filter(isDone).length

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-sky-dark/70 hover:text-sky-dark cursor-pointer text-sm">← Home</button>
        <button onClick={onChangeBand} className="text-xs text-ink-soft underline cursor-pointer">Change age group</button>
      </div>

      <div className="text-center px-6 mb-4">
        <div className="text-5xl mb-1">{band.emoji}</div>
        <h2 className="font-display text-4xl" style={{ color: band.color }}>{band.name}</h2>
        <p className="text-ink-soft text-xs">Ages {band.ages} · {band.grade}</p>
        <div className="max-w-xs mx-auto mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-ink/5 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${(doneCount / band.levels.length) * 100}%` }}
              style={{ backgroundColor: band.color }} />
          </div>
          <span className="text-[11px] text-ink-soft">{doneCount}/{band.levels.length}</span>
        </div>
        {doneCount === band.levels.length && (
          <p className="mt-2 text-sm font-display" style={{ color: band.color }}>🎉 All done! Try the next age group for a challenge.</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 max-w-md mx-auto w-full">
        <div className="relative">
          <div className="absolute left-[27px] top-4 bottom-4 border-l-2 border-dashed" style={{ borderColor: band.color + '44' }} />
          <div className="space-y-3">
            {band.levels.map((l, i) => {
              const done = isDone(l)
              const next = i === nextIdx
              return (
                <motion.button key={l.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.98 }} onClick={() => onPlay(l)}
                  className="relative w-full flex items-center gap-3 bg-white/85 rounded-2xl p-3 shadow-sm hover:shadow-md text-left cursor-pointer"
                  style={next ? { boxShadow: `0 0 0 2px ${band.color}` } : undefined}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0 relative z-10"
                    style={{ backgroundColor: done ? '#22C55E' : next ? band.color : '#fff', color: done || next ? '#fff' : band.color,
                      border: done || next ? 'none' : `2px solid ${band.color}55` }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className="text-2xl">{l.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg leading-tight" style={{ color: band.color }}>{l.title}</p>
                    <p className="text-ink-soft text-xs truncate">{l.blurb}</p>
                  </div>
                  {next && <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: band.color }}>Next up</span>}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
