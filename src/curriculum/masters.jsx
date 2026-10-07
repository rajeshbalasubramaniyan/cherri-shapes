import { Grid, Cubes, Net, AngleTriangle, AngleSplit, Measured } from '../engines/figures'

// Ages 9-11 · Year 5-6 / Grade 5
// Quadrilaterals, coordinates, transformations, volume, nets, angle facts, area of triangles and compound shapes.
const cubeNet = [{ sq: [1, 0] }, { sq: [0, 1] }, { sq: [1, 1] }, { sq: [2, 1] }, { sq: [3, 1] }, { sq: [1, 2] }]
const pyramidNet = [
  { sq: [1, 1] },
  { tri: [[1, 1], [2, 1], [1.5, 0]] }, { tri: [[1, 2], [2, 2], [1.5, 3]] },
  { tri: [[1, 1], [1, 2], [0, 1.5]] }, { tri: [[2, 1], [2, 2], [3, 1.5]] },
]
const prismNet = [
  { rect: [0.5, 1, 1, 2] }, { rect: [1.5, 1, 1, 2] }, { rect: [2.5, 1, 1, 2] },
  { tri: [[1.5, 1], [2.5, 1], [2, 0.13]] }, { tri: [[1.5, 3], [2.5, 3], [2, 3.87]] },
]
const cylinderNet = [{ rect: [0.5, 1.2, 3, 1.6] }, { circle: [2, 0.7, 0.5] }, { circle: [2, 3.3, 0.5] }]
const tetraNet = [
  { tri: [[0, 1.73], [1, 1.73], [0.5, 0.866]] }, { tri: [[1, 1.73], [2, 1.73], [1.5, 0.866]] },
  { tri: [[0.5, 0.866], [1.5, 0.866], [1, 0]] }, { tri: [[0.5, 0.866], [1.5, 0.866], [1, 1.73]] },
]
const SOLIDS = ['cube', 'square-based pyramid', 'triangular prism', 'cylinder']

export default {
  id: 'masters',
  name: 'Shape Masters',
  ages: '9–11',
  grade: 'Year 5–6 · Grade 5',
  emoji: '🧭',
  color: '#8B5CF6',
  about: 'Plot coordinates, slide, flip and turn shapes, fold nets into solids, work out volume and use angle facts like a mathematician.',
  levels: [
    { id: 'quads', game: 'quads', title: 'The Quad Family', blurb: 'Squares, rhombuses & friends', emoji: '🔷' },
    {
      id: 'plot-points', engine: 'plot', title: 'Treasure Map', blurb: 'Plot points on a grid', emoji: '🗺️',
      content: {
        prompt: 'Tap the spot. Go along the x-axis first, then up the y-axis.',
        size: 6,
        rounds: [
          { x: 2, y: 3, thing: '💎', explain: 'Along 2, up 3. We write it (2, 3).' },
          { x: 5, y: 1, thing: '🗝️' },
          { x: 0, y: 4, thing: '🦜', explain: 'Along 0 means you stay on the y-axis and just go up 4.' },
          { x: 4, y: 4, thing: '🏝️' },
          { x: 1, y: 5, thing: '⚓', explain: '(1, 5) is not the same as (5, 1)! Order matters: along first, then up.' },
          { x: 6, y: 0, thing: '🪙', explain: 'Up 0 means you stay on the x-axis.' },
        ],
      },
    },
    {
      id: 'read-coordinates', engine: 'choose', title: 'Where Is It?', blurb: 'Read coordinates', emoji: '📍',
      content: {
        prompt: 'What are the coordinates of point A?',
        rounds: [
          { figure: <Grid points={[{ x: 3, y: 2, label: 'A' }]} />, options: ['(3, 2)', '(2, 3)', '(3, 3)'], answer: '(3, 2)', explain: 'Along 3, up 2, so A is at (3, 2).' },
          { figure: <Grid points={[{ x: 1, y: 4, label: 'A' }]} />, options: ['(4, 1)', '(1, 4)', '(1, 1)'], answer: '(1, 4)', explain: 'Along 1, up 4. Remember: along the corridor, then up the stairs.' },
          { figure: <Grid points={[{ x: 5, y: 5, label: 'A' }]} />, options: ['(5, 5)', '(5, 4)', '(4, 5)'], answer: '(5, 5)' },
          { figure: <Grid points={[{ x: 0, y: 3, label: 'A' }]} />, options: ['(3, 0)', '(0, 3)', '(3, 3)'], answer: '(0, 3)', explain: 'A is on the y-axis, so its x-coordinate is 0.' },
          {
            q: 'A, B and C are corners of a square. Where is the 4th corner?',
            figure: <Grid points={[{ x: 1, y: 1, label: 'A' }, { x: 4, y: 1, label: 'B' }, { x: 4, y: 4, label: 'C' }]} />,
            options: ['(1, 4)', '(4, 1)', '(0, 4)'], answer: '(1, 4)', explain: 'It must be straight above A and level with C: x = 1, y = 4.',
          },
        ],
      },
    },
    {
      id: 'transformations', engine: 'choose', title: 'Slide, Flip, Turn', blurb: 'Translation, reflection, rotation', emoji: '🪞',
      content: {
        prompt: 'The dotted shape moved to the purple one. How did it move?',
        rounds: [
          { figure: <Grid size={8} shapes={[{ pts: [[1, 1], [3, 1], [1, 3]], ghost: true }, { pts: [[4, 2], [6, 2], [4, 4]] }]} />, options: ['translation', 'reflection', 'rotation'], answer: 'translation', explain: 'It slid 3 right and 1 up without turning or flipping. A slide is called a translation.' },
          { figure: <Grid size={8} line={[[4, 0], [4, 8]]} shapes={[{ pts: [[1, 1], [3, 1], [1, 4]], ghost: true }, { pts: [[7, 1], [5, 1], [7, 4]] }]} />, options: ['translation', 'reflection', 'rotation'], answer: 'reflection', explain: 'It flipped over the orange mirror line. Each corner is the same distance from the line on the other side.' },
          { figure: <Grid size={8} points={[{ x: 2, y: 2, color: '#334155' }]} shapes={[{ pts: [[2, 2], [4, 2], [2, 5]], ghost: true }, { pts: [[2, 2], [2, 0], [5, 2]] }]} />, options: ['translation', 'reflection', 'rotation'], answer: 'rotation', explain: 'It turned a quarter turn clockwise around the dark point. A turn is called a rotation.' },
          { q: 'The shape slid 3 squares right. Where does corner (1, 2) go?', figure: <Grid size={8} points={[{ x: 1, y: 2, label: '(1,2)' }]} />, options: ['(4, 2)', '(1, 5)', '(3, 2)'], answer: '(4, 2)', explain: 'Moving right changes only x: 1 + 3 = 4. y stays 2.' },
          { q: 'Translate (5, 6) down 4 squares.', figure: <Grid size={8} points={[{ x: 5, y: 6, label: '(5,6)' }]} />, options: ['(5, 2)', '(1, 6)', '(5, 10)'], answer: '(5, 2)', explain: 'Moving down changes only y: 6 − 4 = 2.' },
          { figure: <Grid size={8} shapes={[{ pts: [[1, 5], [3, 5], [3, 7], [1, 7]], ghost: true }, { pts: [[4, 1], [6, 1], [6, 3], [4, 3]] }]} />, options: ['translation', 'reflection', 'rotation'], answer: 'translation', explain: '3 right and 4 down. Same size, same way up. A translation.' },
        ],
      },
    },
    {
      id: 'volume', engine: 'choose', title: 'Cube Builder', blurb: 'Volume by counting cubes', emoji: '🧱',
      content: {
        prompt: 'Volume is how much space a solid takes up. Count the 1 cm cubes.',
        rounds: [
          { q: 'How many cubes?', figure: <Cubes w={2} d={2} h={2} />, options: ['6', '8', '12'], answer: '8', keepOrder: true, explain: '2 × 2 on each layer, and 2 layers: 2 × 2 × 2 = 8 cm³.' },
          { q: 'What is the volume?', figure: <Cubes w={3} d={2} h={2} color="#F59E0B" />, options: ['7 cm³', '10 cm³', '12 cm³'], answer: '12 cm³', keepOrder: true, explain: 'Each layer is 3 × 2 = 6 cubes, and there are 2 layers. 6 × 2 = 12 cm³. Some cubes hide at the back!' },
          { q: 'What is the volume?', figure: <Cubes w={4} d={1} h={3} color="#4ADE80" />, options: ['8 cm³', '12 cm³', '16 cm³'], answer: '12 cm³', keepOrder: true, explain: 'length × width × height = 4 × 1 × 3 = 12 cm³.' },
          { q: 'What is the volume?', figure: <Cubes w={3} d={3} h={3} color="#FB7185" />, options: ['9 cm³', '18 cm³', '27 cm³'], answer: '27 cm³', keepOrder: true, explain: '3 × 3 × 3 = 27 cm³. A cube number!' },
          { q: 'A box is 5 cm long, 2 cm wide and 3 cm high. Volume?', figure: <Cubes w={5} d={2} h={3} color="#A78BFA" />, options: ['10 cm³', '30 cm³', '25 cm³'], answer: '30 cm³', keepOrder: true, explain: 'V = l × w × h = 5 × 2 × 3 = 30 cm³.' },
        ],
      },
    },
    {
      id: 'nets', engine: 'choose', title: 'Fold It Up', blurb: 'Nets of 3D shapes', emoji: '📦',
      content: {
        prompt: 'A net is a flat shape that folds up into a solid. What will this one make?',
        rounds: [
          { figure: <Net pieces={cubeNet} cols={4} rows={3} />, options: SOLIDS, answer: 'cube', explain: '6 squares that fold up into a box. Every cube net has exactly 6 squares.' },
          { figure: <Net pieces={pyramidNet} cols={3} rows={3} color="#FBBF24" />, options: SOLIDS, answer: 'square-based pyramid', explain: 'A square base with 4 triangles that fold up to meet at the top, like the pyramids in Egypt.' },
          { figure: <Net pieces={prismNet} cols={4} rows={4} color="#38BDF8" />, options: SOLIDS, answer: 'triangular prism', explain: '2 triangle ends and 3 rectangles. Like a Toblerone box or a tent.' },
          { figure: <Net pieces={cylinderNet} cols={4} rows={4} color="#FB7185" />, options: SOLIDS, answer: 'cylinder', explain: 'A rectangle rolls into a tube, and 2 circles close the ends. Like a tin can.' },
          { figure: <Net pieces={tetraNet} cols={2} rows={2} color="#A78BFA" />, options: ['cube', 'triangular prism', 'tetrahedron', 'cylinder'], answer: 'tetrahedron', explain: '4 triangles fold into a triangle-based pyramid, also called a tetrahedron.' },
          { q: 'Will this net fold into a cube?', figure: <Net pieces={[0, 1, 2, 3, 4, 5].map(c => ({ sq: [c, 0] }))} cols={6} rows={1} />, options: ['Yes', 'No'], answer: 'No', explain: 'If all 6 squares are in a row, the ends overlap and the top and bottom are missing. Not a cube net.' },
          { q: 'Will this net fold into a cube?', figure: <Net pieces={[{ sq: [0, 0] }, { sq: [0, 1] }, { sq: [1, 1] }, { sq: [2, 1] }, { sq: [3, 1] }, { sq: [3, 2] }]} cols={4} rows={3} />, options: ['Yes', 'No'], answer: 'Yes', explain: 'A row of 4 makes the sides, and one square on each side of the row becomes the top and the bottom.' },
        ],
      },
    },
    {
      id: 'angle-facts', engine: 'choose', title: 'Missing Angles', blurb: 'Angles in triangles and lines', emoji: '🔍',
      content: {
        prompt: 'Find the missing angle.',
        rounds: [
          { q: 'Angles in a triangle add up to 180°.', figure: <AngleTriangle a={60} b={70} />, options: ['40°', '50°', '60°'], answer: '50°', keepOrder: true, explain: '60 + 70 = 130, and 180 − 130 = 50°.' },
          { q: 'Angles in a triangle add up to 180°.', figure: <AngleTriangle a={90} b={35} />, options: ['45°', '55°', '65°'], answer: '55°', keepOrder: true, explain: '90 + 35 = 125, and 180 − 125 = 55°.' },
          { q: 'Angles on a straight line add up to 180°.', figure: <AngleSplit angles={[120]} />, options: ['50°', '60°', '80°'], answer: '60°', keepOrder: true, explain: '180 − 120 = 60°.' },
          { q: 'Angles on a straight line add up to 180°.', figure: <AngleSplit angles={[50, 70]} />, options: ['50°', '60°', '70°'], answer: '60°', keepOrder: true, explain: '50 + 70 = 120, and 180 − 120 = 60°.' },
          { q: 'Angles all the way round a point add up to 360°.', figure: <AngleSplit angles={[90, 120, 100]} total={360} />, options: ['40°', '50°', '60°'], answer: '50°', keepOrder: true, explain: '90 + 120 + 100 = 310, and 360 − 310 = 50°.' },
          { q: 'An equilateral triangle has 3 equal angles. How big is each one?', emoji: '🔺', options: ['45°', '60°', '90°'], answer: '60°', keepOrder: true, explain: '180 ÷ 3 = 60°.' },
        ],
      },
    },
    {
      id: 'area-plus', engine: 'choose', title: 'Area Challenge', blurb: 'Triangles and L-shapes', emoji: '🏗️',
      content: {
        prompt: 'Work out the area.',
        rounds: [
          { q: 'Area of a triangle = ½ × base × height', figure: <Measured shape="triangle" w={6} h={4} />, options: ['10 cm²', '12 cm²', '24 cm²'], answer: '12 cm²', explain: 'A triangle is half of a rectangle. 6 × 4 = 24, and half of 24 is 12 cm².' },
          { q: 'Area of a triangle = ½ × base × height', figure: <Measured shape="triangle" w={8} h={5} color="#38BDF8" />, options: ['20 cm²', '40 cm²', '13 cm²'], answer: '20 cm²', explain: '8 × 5 = 40, then half: 20 cm².' },
          { q: 'Split the L-shape into rectangles. Area?', figure: <Measured shape="L" w={6} h={5} cut={[3, 2]} color="#4ADE80" />, options: ['24 cm²', '30 cm²', '22 cm²'], answer: '24 cm²', explain: 'The whole 6 × 5 rectangle is 30. The missing corner is 3 × 2 = 6. 30 − 6 = 24 cm².' },
          { q: 'Split the L-shape into rectangles. Area?', figure: <Measured shape="L" w={8} h={6} cut={[4, 3]} color="#FB923C" />, options: ['36 cm²', '48 cm²', '32 cm²'], answer: '36 cm²', explain: '8 × 6 = 48, minus the missing 4 × 3 = 12. 48 − 12 = 36 cm².' },
          { q: 'Which rectangle has the bigger area?', text: '6 cm × 4 cm  or  5 cm × 5 cm', options: ['6 × 4', '5 × 5', 'the same'], answer: '5 × 5', explain: '6 × 4 = 24 and 5 × 5 = 25. Both have perimeter 20, but the square holds more!' },
        ],
      },
    },
  ],
}
