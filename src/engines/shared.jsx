import { motion } from 'framer-motion'

export function shuffle(a) {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export function Progress({ total, current, color }) {
  return (
    <div className="flex justify-center gap-1.5 mb-3">
      {Array.from({ length: total }).map((_, k) => (
        <div key={k} className="h-1.5 rounded-full transition-all"
          style={{ width: k === current ? 20 : 8, backgroundColor: k <= current ? color : '#CBD5E1' }} />
      ))}
    </div>
  )
}

export function NextButton({ onClick, last, label }) {
  return (
    <div className="px-6 pb-8 max-w-md mx-auto w-full">
      <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className="w-full bg-gradient-to-b from-grass to-grass-dark text-white font-display text-lg py-4 rounded-full cursor-pointer shadow-md">
        {label || (last ? 'Finish level 🎉' : 'Next →')}
      </motion.button>
    </div>
  )
}

export function Explain({ text, color = '#16A34A' }) {
  if (!text) return null
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="mt-4 bg-white/85 rounded-2xl px-4 py-3 max-w-sm text-left shadow-sm border-l-4"
      style={{ borderColor: color }}>
      <p className="text-ink text-sm leading-relaxed">💡 {text}</p>
    </motion.div>
  )
}

export function Prompt({ children }) {
  return <p className="text-center text-ink-soft text-sm px-6 mb-2">{children}</p>
}
