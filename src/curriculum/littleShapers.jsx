import { Outline, Scene } from '../engines/figures'

// Ages 4-5 · Reception / Pre-K to Kindergarten
// Name and sort 2D shapes, spot them in real life, position words, simple patterns.
export default {
  id: 'little',
  name: 'Little Shapers',
  ages: '4–5',
  grade: 'Reception · Pre-K to Kindergarten',
  emoji: '🔺',
  color: '#FB7185',
  about: 'Meet the shape friends, count corners, spot shapes at home, and learn words like on, under and next to.',
  levels: [
    { id: 'meet', game: 'meet', title: 'Meet the Shapes', blurb: 'Say hello to the shape friends', emoji: '👋' },
    { id: 'count-corners', game: 'count-corners', title: 'Count the Corners', blurb: 'Tap each corner to count them', emoji: '🔺' },
    {
      id: 'curvy-straight', engine: 'choose', title: 'Curvy or Straight?', blurb: 'Feel the sides of a shape', emoji: '〰️',
      content: {
        prompt: 'Are the sides curvy, straight, or both?', keepOrder: true,
        rounds: [
          { figure: <Outline kind="circle" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Curvy', explain: 'A circle is one big curvy line. No corners at all!' },
          { figure: <Outline kind="square" color="#38BDF8" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Straight', explain: 'A square has 4 straight sides and 4 corners.' },
          { figure: <Outline kind="semicircle" color="#FBBF24" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Both', explain: 'A semicircle is half a circle. One curvy side and one straight side.' },
          { figure: <Outline kind="triangle" color="#4ADE80" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Straight', explain: 'Triangles have 3 straight sides.' },
          { figure: <Outline kind="oval" color="#A78BFA" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Curvy', explain: 'An oval is like a stretched circle. Curvy all the way round, like an egg.' },
          { figure: <Outline kind="dome" color="#FB923C" />, options: ['Curvy', 'Straight', 'Both'], answer: 'Both', explain: 'Straight sides at the bottom, a curvy roof on top.' },
        ],
      },
    },
    { id: 'sort', game: 'sort', title: 'Sort the Shapes', blurb: 'Drag each shape to its bin', emoji: '🧺' },
    {
      id: 'shape-spotter', engine: 'choose', title: 'Shape Spotter', blurb: 'Find shapes hiding at home', emoji: '🔍',
      content: {
        prompt: 'Shapes are hiding everywhere!',
        rounds: [
          { q: 'Which one is round like a circle?', options: ['🍪', '📕', '⛺'], answer: '🍪', explain: 'A cookie is round like Sunny the circle.' },
          { q: 'Which one looks like a triangle?', options: ['🍕', '🍩', '🚪'], answer: '🍕', explain: 'A pizza slice has 3 sides and 3 corners, just like Tri.' },
          { q: 'Which one is a rectangle?', options: ['🚪', '⚽', '🍕'], answer: '🚪', explain: 'A door has 2 long sides and 2 short sides. That is a rectangle.' },
          { q: 'Which one is a circle?', options: ['🕐', '📱', '⛺'], answer: '🕐', explain: 'Clocks are usually circles so the hands can go round and round.' },
          { q: 'Which one looks like a triangle?', options: ['⛺', '🍩', '📱'], answer: '⛺', explain: 'A tent has a pointy top and a flat bottom. A triangle!' },
          { q: 'Which one is a rectangle?', options: ['📱', '🍩', '🌕'], answer: '📱', explain: 'A phone is a rectangle with rounded corners.' },
        ],
      },
    },
    {
      id: 'where-is-it', engine: 'choose', title: 'Where Is Kitty?', blurb: 'On, under, next to, inside', emoji: '🐱',
      content: {
        prompt: 'Where is the kitty?',
        rounds: [
          { figure: <Scene pos="on" />, options: ['on top', 'under', 'next to', 'inside'], answer: 'on top', explain: 'Kitty is sitting on top of the box.' },
          { figure: <Scene pos="inside" />, options: ['on top', 'under', 'next to', 'inside'], answer: 'inside', explain: 'Kitty is peeking out from inside the box.' },
          { figure: <Scene pos="beside" />, options: ['on top', 'under', 'next to', 'inside'], answer: 'next to', explain: 'Kitty is next to the box, right beside it.' },
          { figure: <Scene pos="under" thing="🐶" />, q: 'Where is the puppy?', options: ['on top', 'under', 'next to', 'inside'], answer: 'under', explain: 'Puppy is under the table.' },
          { figure: <Scene pos="behind" thing="🐰" />, q: 'Where is the bunny?', options: ['behind', 'under', 'inside', 'on top'], answer: 'behind', explain: 'We can only see the top of bunny. The box is in front, so bunny is behind it.' },
          { figure: <Scene pos="on" thing="🐦" />, q: 'Where is the bird?', options: ['on top', 'under', 'next to', 'behind'], answer: 'on top', explain: 'The bird is resting on top of the box.' },
        ],
      },
    },
    {
      id: 'patterns', engine: 'choose', title: 'What Comes Next?', blurb: 'Finish the shape pattern', emoji: '🔁',
      content: {
        prompt: 'What comes next in the pattern?',
        rounds: [
          { emoji: '🔺🟦🔺🟦🔺 ❓', options: ['🟦', '🔺', '🟢'], answer: '🟦', explain: 'Triangle, square, triangle, square. A square comes next!' },
          { emoji: '🟢🟢🟡🟢🟢🟡🟢 ❓', options: ['🟢', '🟡', '🟦'], answer: '🟢', explain: 'Green, green, yellow. Then it starts again. After one green comes another green.' },
          { emoji: '⭐🔺🟦⭐🔺 ❓', options: ['🟦', '⭐', '🔺'], answer: '🟦', explain: 'Star, triangle, square, again and again.' },
          { emoji: '🟦🟦🔺🔺🟦🟦🔺 ❓', options: ['🔺', '🟦', '⭐'], answer: '🔺', explain: 'Two squares, two triangles. We need one more triangle.' },
          { emoji: '🟡🔺🟡🔺🟡 ❓', options: ['🔺', '🟡', '🟢'], answer: '🔺', explain: 'Circle, triangle, circle, triangle...' },
          { emoji: '❤️⭐⭐❤️⭐ ❓', options: ['⭐', '❤️', '🟦'], answer: '⭐', explain: 'Heart, star, star. The second star comes next.' },
        ],
      },
    },
  ],
}
