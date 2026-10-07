import { Poly, Fraction, Turn, Cubes } from '../engines/figures'

// Ages 6-7 · Year 1-2 / Grade 1-2
// Sides and vertices, symmetry, halves and quarters, turns, 3D shapes and their faces.
export default {
  id: 'explorers',
  name: 'Shape Explorers',
  ages: '6–7',
  grade: 'Year 1–2 · Grade 1–2',
  emoji: '🦋',
  color: '#0EA5E9',
  about: 'Count sides and vertices, fold shapes in half, turn things a quarter or a half, and meet 3D solids.',
  levels: [
    {
      id: 'sides-vertices', engine: 'choose', title: 'Sides & Vertices', blurb: 'Grown-up words for edges and corners', emoji: '⬠',
      content: {
        prompt: 'Count carefully!',
        rounds: [
          { q: 'How many sides does this shape have?', figure: <Poly n={5} color="#A78BFA" />, options: ['4', '5', '6'], answer: '5', keepOrder: true, explain: '5 sides makes a pentagon. "Penta" means five.' },
          { q: 'How many vertices (corners) does it have?', figure: <Poly n={6} color="#FBBF24" dots />, options: ['5', '6', '8'], answer: '6', keepOrder: true, explain: 'A vertex is a corner where two sides meet. A hexagon has 6 of them, like a honeycomb cell.' },
          { q: 'What is this shape called?', figure: <Poly n={8} color="#EF4444" />, options: ['hexagon', 'octagon', 'pentagon'], answer: 'octagon', explain: '8 sides is an octagon. "Octo" means eight, like an octopus. Stop signs are octagons!' },
          { q: 'How many sides does this shape have?', figure: <Poly n={4} color="#38BDF8" />, options: ['3', '4', '5'], answer: '4', keepOrder: true, explain: 'Shapes with 4 sides are called quadrilaterals. "Quad" means four.' },
          { q: 'What is this shape called?', figure: <Poly n={5} color="#4ADE80" dots />, options: ['pentagon', 'hexagon', 'octagon'], answer: 'pentagon', explain: '5 straight sides and 5 vertices. A pentagon.' },
          { q: 'A circle has how many vertices?', figure: <Poly n={40} color="#FB7185" />, options: ['0', '1', '4'], answer: '0', keepOrder: true, explain: 'A circle has no corners at all, so it has 0 vertices.' },
        ],
      },
    },
    { id: 'symmetry', game: 'symmetry', title: 'Mirror Magic', blurb: 'Complete the other half', emoji: '🦋' },
    {
      id: 'halves-quarters', engine: 'choose', title: 'Halves & Quarters', blurb: 'Share shapes fairly', emoji: '🍕',
      content: {
        prompt: 'How much is coloured in?',
        rounds: [
          { figure: <Fraction kind="circle" parts={2} shaded={1} />, options: ['one half', 'one quarter', 'three quarters'], answer: 'one half', explain: '2 equal parts, 1 coloured. That is one half, written ½.' },
          { figure: <Fraction kind="square" parts={4} shaded={1} color="#FBBF24" />, options: ['one half', 'one quarter', 'three quarters'], answer: 'one quarter', explain: '4 equal parts, 1 coloured. That is one quarter, written ¼.' },
          { figure: <Fraction kind="circle" parts={4} shaded={3} color="#4ADE80" />, options: ['one half', 'one quarter', 'three quarters'], answer: 'three quarters', explain: '4 equal parts and 3 are coloured. Three quarters, written ¾.' },
          { q: 'Is this cut into fair halves?', figure: <Fraction kind="bar" parts={2} shaded={1} equal={false} color="#FB7185" />, options: ['Yes, fair halves', 'No, not equal'], answer: 'No, not equal', explain: 'Halves must be the same size. One piece is much bigger, so these are not halves.' },
          { figure: <Fraction kind="square" parts={4} shaded={2} color="#38BDF8" />, options: ['one half', 'one quarter', 'three quarters'], answer: 'one half', explain: '2 quarters make 1 half! ²⁄₄ is the same as ½.' },
          { q: 'Is this cut into fair halves?', figure: <Fraction kind="circle" parts={2} shaded={1} color="#FB923C" />, options: ['Yes, fair halves', 'No, not equal'], answer: 'Yes, fair halves', explain: 'Both pieces are exactly the same size. Fair halves!' },
          { figure: <Fraction kind="bar" parts={3} shaded={1} color="#A78BFA" />, options: ['one half', 'one third', 'one quarter'], answer: 'one third', explain: '3 equal parts, 1 coloured. That is one third, written ⅓.' },
        ],
      },
    },
    {
      id: 'turns', engine: 'choose', title: 'Twist & Turn', blurb: 'Quarter, half and whole turns', emoji: '🔄',
      content: {
        prompt: 'The arrow started pointing up (the dotted one). How far did it turn clockwise?',
        rounds: [
          { figure: <Turn turn={90} />, options: ['quarter turn', 'half turn', 'three-quarter turn', 'whole turn'], answer: 'quarter turn', explain: 'Pointing up, now pointing right. That is a quarter turn clockwise, the way clock hands go.' },
          { figure: <Turn turn={180} />, options: ['quarter turn', 'half turn', 'three-quarter turn', 'whole turn'], answer: 'half turn', explain: 'Up to down is a half turn. It is facing the opposite way.' },
          { figure: <Turn turn={270} />, options: ['quarter turn', 'half turn', 'three-quarter turn', 'whole turn'], answer: 'three-quarter turn', explain: 'Right, down, then left. Three quarter turns clockwise.' },
          { figure: <Turn turn={360} />, options: ['quarter turn', 'half turn', 'three-quarter turn', 'whole turn'], answer: 'whole turn', explain: 'It spun all the way round and ended where it started. A whole turn!' },
          { q: 'This time it turned anticlockwise. How far?', figure: <Turn turn={90} ccw />, options: ['quarter turn', 'half turn', 'three-quarter turn', 'whole turn'], answer: 'quarter turn', explain: 'Anticlockwise is the other way from the clock. Up to left is a quarter turn anticlockwise.' },
          { q: 'Which way did it turn a quarter?', figure: <Turn turn={90} ccw />, options: ['clockwise', 'anticlockwise'], answer: 'anticlockwise', explain: 'It went up to left, the opposite way to clock hands.' },
        ],
      },
    },
    { id: 'solids', game: 'solids', title: '3D Shapes', blurb: 'Flat shapes become solid!', emoji: '🧊' },
    {
      id: 'faces-edges', engine: 'choose', title: 'Faces, Edges, Vertices', blurb: 'Explore solid shapes', emoji: '🎲',
      content: {
        prompt: 'Faces are flat surfaces, edges are where faces meet, vertices are the pointy corners.',
        rounds: [
          { q: 'How many faces does a cube have?', figure: <Cubes w={1} d={1} h={1} />, options: ['4', '6', '8'], answer: '6', keepOrder: true, explain: 'Top, bottom, front, back, left, right. 6 square faces, just like a dice 🎲.' },
          { q: 'How many vertices does a cube have?', figure: <Cubes w={1} d={1} h={1} color="#FB923C" />, options: ['6', '8', '12'], answer: '8', keepOrder: true, explain: '4 corners on top and 4 on the bottom makes 8 vertices.' },
          { q: 'How many edges does a cube have?', figure: <Cubes w={1} d={1} h={1} color="#4ADE80" />, options: ['8', '10', '12'], answer: '12', keepOrder: true, explain: '4 edges round the top, 4 round the bottom, and 4 going up the sides. 12!' },
          { q: 'A ball is a sphere. How many edges does it have?', emoji: '⚽', options: ['0', '1', '2'], answer: '0', keepOrder: true, explain: 'A sphere has one curved surface and no edges or vertices at all. That is why it rolls every way.' },
          { q: 'A tin can is a cylinder. How many flat faces?', emoji: '🥫', options: ['1', '2', '3'], answer: '2', keepOrder: true, explain: 'A circle on the top and a circle on the bottom. Plus one curved surface round the side.' },
          { q: 'An ice cream cone is a cone. How many vertices?', emoji: '🍦', options: ['0', '1', '2'], answer: '1', keepOrder: true, explain: 'A cone has one pointy vertex at its tip, and one flat circle face.' },
          { q: 'This is a cuboid. How many faces?', figure: <Cubes w={3} d={1} h={2} color="#A78BFA" />, options: ['4', '6', '8'], answer: '6', keepOrder: true, explain: 'A cuboid is like a stretched cube. It still has 6 faces, but they are rectangles. A cereal box is a cuboid.' },
        ],
      },
    },
  ],
}
