import { motion } from 'framer-motion'
// mood: happy | tired | scared | cry
const M = {
  happy:  { fill: '#FFD9A8', mouth: 88, eye: 6, brow: 0 },
  tired:  { fill: '#E9D2B8', mouth: 70, eye: 3, brow: 4 },
  scared: { fill: '#DCD0D8', mouth: 58, eye: 9, brow: -5 },
  cry:    { fill: '#C9CCDD', mouth: 54, eye: 2, brow: 6 },
}
export default function Avatar({ mood = 'happy' }) {
  const m = M[mood]
  return (
    <motion.svg viewBox="0 0 100 100" className="w-full h-full"
      animate={mood === 'scared' ? { x: [-2, 2, -2] } : mood === 'cry' ? { y: [0, 3, 0], rotate: [0, -3, 0] } : { x: 0, y: 0 }}
      transition={{ repeat: Infinity, duration: mood === 'scared' ? 0.25 : 1.6 }}>
      <motion.circle cx="50" cy="50" r="42" animate={{ fill: m.fill }} stroke="#0f172a" strokeWidth="2" />
      {[35, 65].map((x, i) => (
        <g key={x}>
          <motion.ellipse cx={x} cy="42" rx="5" animate={{ ry: m.eye }} fill="#0f172a" />
          <motion.line x1={x - 8} x2={x + 8} animate={{ y1: 30 + (i ? -m.brow : m.brow) , y2: 30 + (i ? m.brow : -m.brow) }} stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <motion.path animate={{ d: `M35 72 Q50 ${m.mouth} 65 72` }} fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      {mood === 'cry' && [35, 65].map((x, i) => (
        <motion.ellipse key={x} cx={x} rx="2.5" ry="4" fill="#60a5fa"
          animate={{ cy: [48, 80], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.4 }} />
      ))}
    </motion.svg>
  )
}
