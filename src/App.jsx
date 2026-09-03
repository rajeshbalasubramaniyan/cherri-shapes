import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import MeetShapesPage from './pages/MeetShapesPage'
import CountCornersGame from './pages/CountCornersGame'

export default function App() {
  const [screen, setScreen] = useState('welcome')

  return (
    <div className="relative min-h-[100dvh]">
      {screen === 'welcome' && (
        <WelcomePage
          onStart={() => setScreen('game')}
          onMeet={() => setScreen('meet')}
        />
      )}
      {screen === 'meet' && (
        <MeetShapesPage
          onHome={() => setScreen('welcome')}
          onPlay={() => setScreen('game')}
        />
      )}
      {screen === 'game' && (
        <CountCornersGame onHome={() => setScreen('welcome')} />
      )}
    </div>
  )
}
