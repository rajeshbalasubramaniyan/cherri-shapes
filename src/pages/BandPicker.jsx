import { motion } from 'framer-motion'
import { BANDS } from '../curriculum'

export default function BandPicker({ onPick, onHome, progress }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-sky-dark/70 hover:text-sky-dark cursor-pointer text-sm">← Home</button>
        <h3 className="font-display text-lg text-sky-dark">Who’s learning?</h3>
        <div className="w-12" />
      </div>
      <p className="text-center text-ink-soft text-sm px-6 mb-4">Pick an age group. You can switch any time.</p>

      <div className="flex-1 overflow-y-auto px-5 pb-10 max-w-md mx-auto w-full space-y-3">
        {BANDS.map((b, i) => {
          const done = b.levels.filter(l => progress[`${b.id}/${l.id}`]).length
          return (
            <motion.button key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onPick(b.id)}
              className="w-full bg-white/85 rounded-3xl p-4 shadow-sm hover:shadow-md text-left cursor-pointer border-2"
              style={{ borderColor: b.color + '33' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: b.color + '1f' }}>
                  {b.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="font-display text-2xl" style={{ color: b.color }}>{b.name}</p>
                    <span className="text-xs font-semibold text-ink-soft">Ages {b.ages}</span>
                  </div>
                  <p className="text-[11px] text-ink-soft/70">{b.grade}</p>
                </div>
              </div>
              <p className="text-ink-soft text-xs mt-2 leading-relaxed">{b.about}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 bg-ink/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(done / b.levels.length) * 100}%`, backgroundColor: b.color }} />
                </div>
                <span className="text-[10px] text-ink-soft/70">{done}/{b.levels.length} levels</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
