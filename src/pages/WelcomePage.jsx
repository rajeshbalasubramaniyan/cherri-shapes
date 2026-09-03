import { motion } from 'framer-motion'
import ShapeCharacter from '../components/ShapeCharacter'
import { SHAPES } from '../shapes/shapeData'

const floaters = [
  { shape: SHAPES.triangle, x: '12%', y: '18%', size: 70, delay: 0 },
  { shape: SHAPES.circle, x: '78%', y: '14%', size: 80, delay: 0.4 },
  { shape: SHAPES.square, x: '16%', y: '68%', size: 66, delay: 0.8 },
  { shape: SHAPES.hexagon, x: '80%', y: '66%', size: 74, delay: 1.2 },
]

export default function WelcomePage({ onStart, onMeet }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          className="absolute hidden sm:block"
          style={{ left: f.x, top: f.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ delay: f.delay, type: 'spring', stiffness: 120 }}
        >
          <ShapeCharacter shape={f.shape} size={f.size} float />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        className="mb-4"
      >
        <ShapeCharacter shape={SHAPES.pentagon} size={120} float />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl sm:text-6xl md:text-7xl text-sky-dark mb-2"
      >
        CHERRI SHAPES
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-tangerine text-lg sm:text-xl font-display mb-1"
      >
        Where Daydreams Work!
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-ink-soft text-sm sm:text-base mb-8 max-w-sm"
      >
        Meet the shapes, play their games, and discover geometry all around you!
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={onStart}
        className="bg-gradient-to-b from-sunny to-tangerine text-white font-display text-xl sm:text-2xl px-10 py-4 rounded-full cursor-pointer shadow-lg shadow-tangerine/30"
      >
        Let's Play!
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onMeet}
        className="mt-4 text-sky-dark/70 hover:text-sky-dark text-sm sm:text-base cursor-pointer font-display"
      >
        👋 Meet the Shapes
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-4 text-ink-soft/50 text-[10px]"
      >
        A CHERRI GROUP product · Built with love in Bengaluru
      </motion.p>
    </div>
  )
}
