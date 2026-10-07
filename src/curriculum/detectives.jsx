import { Lines, Angle, Measured } from '../engines/figures'

// Ages 7-9 · Year 3-4 / Grade 3-4
// Points and lines, angles, parallel and perpendicular, perimeter, area, triangle types.
export default {
  id: 'detectives',
  name: 'Shape Detectives',
  ages: '7–9',
  grade: 'Year 3–4 · Grade 3–4',
  emoji: '📐',
  color: '#F59E0B',
  about: 'Spot right angles, parallel lines and triangle types, then measure the way around a shape and the space inside it.',
  levels: [
    { id: 'building-blocks', game: 'building-blocks', title: 'Building Blocks', blurb: 'Points, lines, rays & more', emoji: '📍' },
    { id: 'angles', game: 'angles', title: 'Angle Explorer', blurb: 'Right, sharp, or wide?', emoji: '📐' },
    {
      id: 'lines', engine: 'choose', title: 'Line Detectives', blurb: 'Parallel, perpendicular, crossing', emoji: '🛤️',
      content: {
        prompt: 'What kind of lines are these?',
        rounds: [
          { figure: <Lines kind="parallel" />, options: ['parallel', 'perpendicular', 'intersecting'], answer: 'parallel', explain: 'Parallel lines always stay the same distance apart. They never meet, like train tracks 🛤️.' },
          { figure: <Lines kind="perpendicular" />, options: ['parallel', 'perpendicular', 'intersecting'], answer: 'perpendicular', explain: 'Perpendicular lines cross at a right angle, a perfect square corner.' },
          { figure: <Lines kind="intersecting" />, options: ['parallel', 'perpendicular', 'intersecting'], answer: 'intersecting', explain: 'These lines cross, but not at a right angle. They are just intersecting.' },
          { q: 'Train tracks are...', emoji: '🛤️', options: ['parallel', 'perpendicular'], answer: 'parallel', explain: 'If the rails came closer, the train would fall off! They stay parallel.' },
          { q: 'The lines of a plus sign are...', emoji: '➕', options: ['parallel', 'perpendicular'], answer: 'perpendicular', explain: 'The lines of + meet at four right angles.' },
          { q: 'Opposite sides of a rectangle are...', emoji: '🚪', options: ['parallel', 'perpendicular'], answer: 'parallel', explain: 'The two long sides never meet, and neither do the two short sides. Both pairs are parallel.' },
        ],
      },
    },
    {
      id: 'degrees', engine: 'choose', title: 'Degrees of Turn', blurb: 'Measure angles in degrees', emoji: '🧭',
      content: {
        prompt: 'We measure turns in degrees (°). A whole turn is 360°.',
        rounds: [
          { q: 'How many degrees is a quarter turn?', figure: <Angle deg={90} />, options: ['45°', '90°', '180°', '360°'], answer: '90°', keepOrder: true, explain: 'A quarter of 360° is 90°. That is a right angle.' },
          { q: 'How many degrees is a half turn?', figure: <Angle deg={180} />, options: ['90°', '180°', '270°', '360°'], answer: '180°', keepOrder: true, explain: 'Half of 360° is 180°. It makes a straight line.' },
          { q: 'About how big is this angle?', figure: <Angle deg={45} />, options: ['45°', '90°', '135°', '180°'], answer: '45°', keepOrder: true, explain: 'It is half a right angle, so 45°. That is acute (smaller than 90°).' },
          { q: 'About how big is this angle?', figure: <Angle deg={135} />, options: ['45°', '90°', '135°', '180°'], answer: '135°', keepOrder: true, explain: 'A right angle plus half a right angle: 90° + 45° = 135°. That is obtuse.' },
          { q: 'How many degrees is three quarter turns?', figure: <Angle deg={270} />, options: ['180°', '270°', '300°', '360°'], answer: '270°', keepOrder: true, explain: '90° + 90° + 90° = 270°. An angle bigger than 180° is called a reflex angle.' },
          { q: 'Is this angle acute or obtuse?', figure: <Angle deg={120} />, options: ['acute', 'right', 'obtuse'], answer: 'obtuse', keepOrder: true, explain: 'It is wider than a right angle (90°) but less than a straight line, so it is obtuse.' },
        ],
      },
    },
    { id: 'perimeter', game: 'perimeter', title: 'Around We Go', blurb: 'Measure all the way around', emoji: '📏' },
    { id: 'area', game: 'area', title: 'Fill It Up', blurb: 'Cover the shape to find its area', emoji: '🟨' },
    {
      id: 'measure-puzzles', engine: 'choose', title: 'Measure Puzzles', blurb: 'Perimeter and area with numbers', emoji: '🧮',
      content: {
        prompt: 'Perimeter is the distance around. Area is the space inside.',
        rounds: [
          { q: 'What is the perimeter?', figure: <Measured w={5} h={3} />, options: ['8 cm', '15 cm', '16 cm'], answer: '16 cm', explain: '5 + 3 + 5 + 3 = 16 cm. Add all four sides.' },
          { q: 'What is the area?', figure: <Measured w={5} h={3} color="#38BDF8" />, options: ['8 cm²', '15 cm²', '16 cm²'], answer: '15 cm²', explain: '5 rows of 3 squares. Area = length × width = 5 × 3 = 15 square centimetres.' },
          { q: 'A square has sides of 4 cm. What is its perimeter?', figure: <Measured w={4} h={4} color="#4ADE80" />, options: ['8 cm', '16 cm', '12 cm'], answer: '16 cm', explain: 'A square has 4 equal sides: 4 × 4 = 16 cm.' },
          { q: 'What is the area of that square?', figure: <Measured w={4} h={4} color="#A78BFA" />, options: ['8 cm²', '16 cm²', '12 cm²'], answer: '16 cm²', explain: '4 × 4 = 16 cm². Funny, the perimeter was 16 too. That only happens for a 4 by 4 square!' },
          { q: 'What is the area?', figure: <Measured w={6} h={2} color="#FB923C" />, options: ['8 cm²', '12 cm²', '16 cm²'], answer: '12 cm²', explain: '6 × 2 = 12 cm².' },
          { q: 'A rectangle has a perimeter of 10 cm. One side is 3 cm. How long is the other side?', figure: <Measured w={3} h={2} color="#FB7185" />, options: ['2 cm', '4 cm', '7 cm'], answer: '2 cm', explain: '3 + 3 = 6, and 10 − 6 = 4 left for the other two sides. 4 ÷ 2 = 2 cm each.' },
        ],
      },
    },
    { id: 'triangles', game: 'triangles', title: 'Triangle Types', blurb: 'Equal, twin, or all different?', emoji: '🔻' },
  ],
}
