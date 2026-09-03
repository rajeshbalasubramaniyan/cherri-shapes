import { useState, useEffect } from 'react'
import WelcomePage from './pages/WelcomePage'
import MeetShapesPage from './pages/MeetShapesPage'
import LevelMap from './pages/LevelMap'
import CountCornersGame from './pages/CountCornersGame'
import BuildingBlocksGame from './pages/BuildingBlocksGame'
import SortGame from './pages/SortGame'
import SymmetryGame from './pages/SymmetryGame'
import AnglesGame from './pages/AnglesGame'
import SolidsGame from './pages/SolidsGame'
import PerimeterGame from './pages/PerimeterGame'
import AreaGame from './pages/AreaGame'
import TrianglesGame from './pages/TrianglesGame'
import QuadsGame from './pages/QuadsGame'

const PROGRESS_KEY = 'cherri-shapes-progress'

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') } catch { return {} }
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [completed, setCompleted] = useState(loadProgress)

  useEffect(() => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed)) } catch { /* ignore */ }
  }, [completed])

  const goMap = () => setScreen('map')

  const markDone = (levelId) => {
    setCompleted(prev => ({ ...prev, [levelId]: true }))
    setScreen('map')
  }

  const playGame = (game) => setScreen(game)

  const games = {
    'meet': <MeetShapesPage onHome={goMap} onPlay={() => setScreen('count-corners')} />,
    'count-corners': <CountCornersGame onHome={goMap} onComplete={() => markDone('count-corners')} />,
    'building-blocks': <BuildingBlocksGame onHome={goMap} onComplete={() => markDone('building-blocks')} />,
    'sort': <SortGame onHome={goMap} onComplete={() => markDone('sort')} />,
    'symmetry': <SymmetryGame onHome={goMap} onComplete={() => markDone('symmetry')} />,
    'angles': <AnglesGame onHome={goMap} onComplete={() => markDone('angles')} />,
    'solids': <SolidsGame onHome={goMap} onComplete={() => markDone('solids')} />,
    'perimeter': <PerimeterGame onHome={goMap} onComplete={() => markDone('perimeter')} />,
    'area': <AreaGame onHome={goMap} onComplete={() => markDone('area')} />,
    'triangles': <TrianglesGame onHome={goMap} onComplete={() => markDone('triangles')} />,
    'quads': <QuadsGame onHome={goMap} onComplete={() => markDone('quads')} />,
  }

  return (
    <div className="relative min-h-[100dvh]">
      {screen === 'welcome' && (
        <WelcomePage onStart={goMap} onMeet={() => setScreen('meet')} />
      )}
      {screen === 'map' && (
        <LevelMap onHome={() => setScreen('welcome')} onPlay={playGame} completed={completed} />
      )}
      {games[screen]}
    </div>
  )
}
