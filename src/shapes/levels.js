// The learning journey, grouped by age band. Each level points to a game component.
// Foundations (4-7) build first; deeper levels (6-10) layer on top.

export const LEVELS = [
  {
    id: 'meet',
    game: 'meet',
    title: 'Meet the Shapes',
    blurb: 'Say hello to the shape friends',
    band: '4-7',
    emoji: '👋',
    color: '#A78BFA',
  },
  {
    id: 'count-corners',
    game: 'count-corners',
    title: 'Count the Corners',
    blurb: 'Tap each corner to count them',
    band: '4-7',
    emoji: '🔺',
    color: '#FB7185',
  },
  {
    id: 'building-blocks',
    game: 'building-blocks',
    title: 'Building Blocks',
    blurb: 'Points, lines, rays & more',
    band: '8-10',
    emoji: '📍',
    color: '#EC4899',
  },
  {
    id: 'sort',
    game: 'sort',
    title: 'Sort the Shapes',
    blurb: 'Drag each shape to its bin',
    band: '4-7',
    emoji: '🧺',
    color: '#38BDF8',
  },
  {
    id: 'symmetry',
    game: 'symmetry',
    title: 'Mirror Magic',
    blurb: 'Complete the other half',
    band: '6-8',
    emoji: '🦋',
    color: '#4ADE80',
  },
  {
    id: 'angles',
    game: 'angles',
    title: 'Angle Explorer',
    blurb: 'Right, sharp, or wide?',
    band: '7-10',
    emoji: '📐',
    color: '#FB923C',
  },
  {
    id: 'solids',
    game: 'solids',
    title: '3D Shapes',
    blurb: 'Flat shapes become solid!',
    band: '7-10',
    emoji: '🧊',
    color: '#0284C7',
  },
  {
    id: 'perimeter',
    game: 'perimeter',
    title: 'Around We Go',
    blurb: 'Measure all the way around',
    band: '8-10',
    emoji: '📏',
    color: '#FBBF24',
  },
]

export const BANDS = ['4-7', '6-8', '7-10', '8-10']
