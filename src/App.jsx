import { useState, useEffect } from 'react'
import WelcomePage from './pages/WelcomePage'
import BandPicker from './pages/BandPicker'
import BandMap from './pages/BandMap'
import MeetShapesPage from './pages/MeetShapesPage'
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
import { BANDS, getBand } from './curriculum'
import { ENGINES } from './engines'
import { SiteNav, SiteFooter } from './components/SiteChrome'

const PROGRESS_KEY = 'cherri-shapes-progress-v2'
const BAND_KEY = 'cherri-shapes-band'
const OLD_PROGRESS_KEY = 'cherri-shapes-progress'

const GAMES = {
  'count-corners': CountCornersGame,
  'building-blocks': BuildingBlocksGame,
  sort: SortGame,
  symmetry: SymmetryGame,
  angles: AnglesGame,
  solids: SolidsGame,
  perimeter: PerimeterGame,
  area: AreaGame,
  triangles: TrianglesGame,
  quads: QuadsGame,
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null')
    if (saved) return saved
    // carry over games finished before age groups existed
    const old = JSON.parse(localStorage.getItem(OLD_PROGRESS_KEY) || '{}')
    const migrated = {}
    BANDS.forEach(b => b.levels.forEach(l => { if (l.game && old[l.game]) migrated[`${b.id}/${l.id}`] = true }))
    return migrated
  } catch { return {} }
}

function loadBand() {
  try { return localStorage.getItem(BAND_KEY) } catch { return null }
}

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [progress, setProgress] = useState(loadProgress)
  const [bandId, setBandId] = useState(loadBand)
  const [level, setLevel] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)) } catch { /* ignore */ }
  }, [progress])

  const band = getBand(bandId)

  const pickBand = (id) => {
    setBandId(id)
    try { localStorage.setItem(BAND_KEY, id) } catch { /* ignore */ }
    setScreen('map')
  }

  const goMap = () => { setLevel(null); setScreen(band ? 'map' : 'picker') }
  const play = (lvl) => { setLevel(lvl); setScreen('level') }
  const complete = (lvl = level) => {
    setProgress(prev => ({ ...prev, [`${band.id}/${lvl.id}`]: true }))
    goMap()
  }

  const renderLevel = () => {
    if (!level) return null
    if (level.game === 'meet') {
      const nextLevel = band.levels.find(l => l.game === 'count-corners')
      return <MeetShapesPage onHome={goMap} onPlay={() => {
        setProgress(prev => ({ ...prev, [`${band.id}/meet`]: true }))
        if (nextLevel) play(nextLevel); else goMap()
      }} />
    }
    if (level.game) {
      const Game = GAMES[level.game]
      return <Game onHome={goMap} onComplete={() => complete()} />
    }
    const Engine = ENGINES[level.engine]
    return <Engine key={level.id} title={level.title} color={band.color} content={level.content} onHome={goMap} onComplete={() => complete()} />
  }

  return (
    <div className="relative min-h-[100dvh]">
      {screen !== 'level' && <SiteNav />}
      {screen === 'welcome' && (
        <WelcomePage
          onStart={() => setScreen(band ? 'map' : 'picker')}
          onMeet={() => { setBandId('little'); setLevel(getBand('little').levels[0]); setScreen('level') }}
        />
      )}
      {screen === 'picker' && <BandPicker onPick={pickBand} onHome={() => setScreen('welcome')} progress={progress} />}
      {screen === 'map' && band && (
        <BandMap band={band} progress={progress} onPlay={play} onChangeBand={() => setScreen('picker')} onHome={() => setScreen('welcome')} />
      )}
      {screen === 'level' && renderLevel()}
      {screen !== 'level' && <SiteFooter />}
    </div>
  )
}
