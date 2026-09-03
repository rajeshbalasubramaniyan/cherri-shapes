// Each shape is a character. Geometry drives personality.
// Vertices are in a 0..100 viewBox so components can render corners as tappable dots.

export const SHAPES = {
  triangle: {
    id: 'triangle',
    name: 'Tri',
    label: 'Triangle',
    corners: 3,
    sides: 3,
    color: 'var(--color-coral)',
    colorHex: '#FB7185',
    emoji: '🔺',
    personality: 'Brave and pointy! Triangles are the strongest shape, so they hold up bridges and rooftops.',
    fact: 'A triangle has 3 corners and 3 sides.',
    vertices: [
      { x: 50, y: 12 },
      { x: 88, y: 82 },
      { x: 12, y: 82 },
    ],
  },
  square: {
    id: 'square',
    name: 'Quad',
    label: 'Square',
    corners: 4,
    sides: 4,
    color: 'var(--color-sky)',
    colorHex: '#38BDF8',
    emoji: '🟦',
    personality: 'Steady and fair. All four of Quad\'s sides are exactly the same length!',
    fact: 'A square has 4 equal sides and 4 corners.',
    vertices: [
      { x: 18, y: 18 },
      { x: 82, y: 18 },
      { x: 82, y: 82 },
      { x: 18, y: 82 },
    ],
  },
  rectangle: {
    id: 'rectangle',
    name: 'Recto',
    label: 'Rectangle',
    corners: 4,
    sides: 4,
    color: 'var(--color-grass)',
    colorHex: '#4ADE80',
    emoji: '🟩',
    personality: 'Tall and helpful. Recto is like a square that stretched! Doors and books are rectangles.',
    fact: 'A rectangle has 4 corners. Two sides are long and two are short.',
    vertices: [
      { x: 20, y: 30 },
      { x: 80, y: 30 },
      { x: 80, y: 70 },
      { x: 20, y: 70 },
    ],
  },
  circle: {
    id: 'circle',
    name: 'Sunny',
    label: 'Circle',
    corners: 0,
    sides: 1,
    curved: true,
    color: 'var(--color-sunny)',
    colorHex: '#FBBF24',
    emoji: '🟡',
    personality: 'Smooth and happy! Sunny has no corners at all, so she rolls everywhere she goes.',
    fact: 'A circle has 0 corners and 1 curved side. It is perfectly round!',
    vertices: [],
    cx: 50, cy: 50, r: 38,
  },
  pentagon: {
    id: 'pentagon',
    name: 'Penta',
    label: 'Pentagon',
    corners: 5,
    sides: 5,
    color: 'var(--color-grape)',
    colorHex: '#A78BFA',
    emoji: '⬠',
    personality: 'Penta has five of everything and loves to share high-fives!',
    fact: 'A pentagon has 5 corners and 5 sides.',
    vertices: [
      { x: 50, y: 10 },
      { x: 88, y: 38 },
      { x: 73, y: 84 },
      { x: 27, y: 84 },
      { x: 12, y: 38 },
    ],
  },
  hexagon: {
    id: 'hexagon',
    name: 'Hex',
    label: 'Hexagon',
    corners: 6,
    sides: 6,
    color: 'var(--color-tangerine)',
    colorHex: '#FB923C',
    emoji: '⬡',
    personality: 'Hex has six sides and loves bees — honeycombs are made of hexagons!',
    fact: 'A hexagon has 6 corners and 6 sides.',
    vertices: [
      { x: 50, y: 10 },
      { x: 85, y: 30 },
      { x: 85, y: 70 },
      { x: 50, y: 90 },
      { x: 15, y: 70 },
      { x: 15, y: 30 },
    ],
  },
}

// Ordered cast for the "Meet the Shapes" intro and the foundation levels.
export const SHAPE_ORDER = ['circle', 'triangle', 'square', 'rectangle', 'pentagon', 'hexagon']

export function pointsToPath(vertices) {
  if (!vertices || vertices.length === 0) return ''
  return vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ') + ' Z'
}
