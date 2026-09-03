import { motion } from 'framer-motion'
import { LEVELS } from '../shapes/levels'

export default function LevelMap({ onHome, onPlay, completed = {} }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onHome} className="text-sky-dark/70 hover:text-sky-dark cursor-pointer text-sm">
          ← Home
        </button>
        <h3 className="font-display text-lg text-sky-dark">Your Journey</h3>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 max-w-md mx-auto w-full">
        <div className="relative">
          {/* winding dotted path */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-sky/30" />

          <div className="space-y-4">
            {LEVELS.map((lvl, i) => {
              const isDone = completed[lvl.id]
              return (
                <motion.button
                  key={lvl.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPlay(lvl.game)}
                  className="relative w-full flex items-center gap-4 bg-white/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 relative z-10"
                    style={{ backgroundColor: lvl.color + '22' }}
                  >
                    {lvl.emoji}
                    {isDone && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-grass text-white text-[11px] flex items-center justify-center shadow">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg" style={{ color: lvl.color }}>{lvl.title}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-ink/5 text-ink-soft/70">
                        Ages {lvl.band}
                      </span>
                    </div>
                    <p className="text-ink-soft text-xs">{lvl.blurb}</p>
                  </div>
                  <span className="text-sky-dark/30 text-lg flex-shrink-0">▶</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        <p className="text-center text-ink-soft/40 text-[10px] mt-8">
          More adventures coming soon!
        </p>
      </div>
    </div>
  )
}
