import { motion, AnimatePresence } from 'framer-motion'

// Emotion configurations
const MOOD_DATA = {
  happy: {
    skin: '#FFEFE6',
    blushOpacity: 0.65,
    mouthD: 'M44 68 Q50 77 56 68 Z', // happy open smile showing tongue
    mouthFill: '#FF6B8B',
    browL: { y1: 34, y2: 36, rotate: -4 },
    browR: { y1: 36, y2: 34, rotate: 4 },
    eyeScaleY: 1,
    pupilScale: 1.15,
    sparkleOpacity: 1,
    headShake: { y: [0, -2, 0] },
    transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
  },
  tired: {
    skin: '#F5E8E4',
    blushOpacity: 0.2,
    mouthD: 'M44 71 Q50 68 56 71', // slight flat wavy droop
    mouthFill: 'transparent',
    browL: { y1: 37, y2: 36, rotate: 2 },
    browR: { y1: 36, y2: 37, rotate: -2 },
    eyeScaleY: 0.35, // half-lidded sleepy eyes
    pupilScale: 0.8,
    sparkleOpacity: 0.2,
    headShake: { y: [0, 2, 0], rotate: [0, 1.5, 0] },
    transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
  },
  scared: {
    skin: '#EAE6F2', // pale lavender tint
    blushOpacity: 0.1,
    mouthD: 'M45 72 Q48 67 50 72 Q52 67 55 72', // trembling wobbly mouth
    mouthFill: 'transparent',
    browL: { y1: 32, y2: 38, rotate: -14 },
    browR: { y1: 38, y2: 32, rotate: 14 },
    eyeScaleY: 1.1,
    pupilScale: 0.45, // shrunk anime terror pupils
    sparkleOpacity: 0,
    headShake: { x: [-1.5, 1.5, -1, 1, 0], y: [-0.5, 0.5, 0] },
    transition: { repeat: Infinity, duration: 0.15 },
  },
  cry: {
    skin: '#FFF2F2',
    blushOpacity: 0.85, // heavily flushed
    mouthD: 'M43 74 Q50 67 57 74 Z', // quiver sob mouth
    mouthFill: '#993355',
    browL: { y1: 33, y2: 39, rotate: -18 },
    browR: { y1: 39, y2: 33, rotate: 18 },
    eyeScaleY: 0.7,
    pupilScale: 0.9,
    sparkleOpacity: 0.9,
    headShake: { y: [0, 2.5, 0], rotate: [-1, 1, -1] },
    transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' },
  },
}

export default function AnimeAvatar({ mood = 'happy' }) {
  const m = MOOD_DATA[mood] || MOOD_DATA.happy

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full select-none"
      animate={m.headShake}
      transition={m.transition}
    >
      <defs>
        {/* Soft anime cheek blush gradient */}
        <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4B72" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF4B72" stopOpacity="0" />
        </radialGradient>

        {/* Rich anime eye gradient */}
        <linearGradient id="eyeIris" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A1E6D" />
          <stop offset="45%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#C77DFF" />
        </linearGradient>

        {/* Tear gradient */}
        <linearGradient id="tearGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
        </linearGradient>

        {/* Scared shadow drop */}
        <linearGradient id="dreadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* --- BACK HAIR & TWIN LOCKS --- */}
      <path
        d="M20 42 C12 60 14 85 24 88 C27 82 25 60 27 50"
        fill="#2B263E"
      />
      <path
        d="M80 42 C88 60 86 85 76 88 C73 82 75 60 73 50"
        fill="#2B263E"
      />
      <circle cx="50" cy="50" r="37" fill="#241E34" />

      {/* --- EARS --- */}
      <circle cx="21" cy="54" r="5" fill="#FAD1C5" />
      <circle cx="79" cy="54" r="5" fill="#FAD1C5" />

      {/* --- FACE BASE (Anime tapered chin) --- */}
      <motion.path
        animate={{ fill: m.skin }}
        transition={{ duration: 0.3 }}
        d="M23 48 C23 34 35 27 50 27 C65 27 77 34 77 48 C77 65 63 78 50 82 C37 78 23 65 23 48 Z"
      />

      {/* Scared / Dread Shadow on forehead */}
      {mood === 'scared' && (
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          d="M27 34 Q50 30 73 34 L71 52 Q50 46 29 52 Z"
          fill="url(#dreadGrad)"
        />
      )}

      {/* --- BLUSH CHEEKS --- */}
      <motion.ellipse
        cx="33"
        cy="59"
        rx="8"
        ry="4.5"
        fill="url(#blushGrad)"
        animate={{ opacity: m.blushOpacity }}
        transition={{ duration: 0.2 }}
      />
      <motion.ellipse
        cx="67"
        cy="59"
        rx="8"
        ry="4.5"
        fill="url(#blushGrad)"
        animate={{ opacity: m.blushOpacity }}
        transition={{ duration: 0.2 }}
      />
      {/* Subtle flushed nose tip for crying */}
      {mood === 'cry' && (
        <ellipse cx="50" cy="62" rx="3.5" ry="2" fill="#FF5C7A" opacity="0.6" />
      )}

      {/* Tiny anime nose */}
      <path d="M49.5 59 Q50 60.5 51 60.5" stroke="#D19C91" strokeWidth="1" strokeLinecap="round" fill="none" />

      {/* --- EYES --- */}
      {[
        { cx: 35.5, brow: m.browL },
        { cx: 64.5, brow: m.browR },
      ].map(({ cx, brow }, i) => (
        <g key={i}>
          {/* Eyebrow */}
          <motion.line
            x1={cx - 7}
            x2={cx + 7}
            animate={{ y1: brow.y1, y2: brow.y2 }}
            transition={{ duration: 0.2 }}
            stroke="#2E243A"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Eye Socket / Scaling Container */}
          <motion.g
            style={{ originX: `${cx}px`, originY: '50px' }}
            animate={{ scaleY: m.eyeScaleY }}
            transition={{ duration: 0.25 }}
          >
            {/* Sclera (Eye White) */}
            <ellipse cx={cx} cy="50" rx="9" ry="8" fill="#FFFFFF" />

            {/* Iris */}
            <ellipse cx={cx} cy="50.5" rx="7.5" ry="7.5" fill="url(#eyeIris)" />

            {/* Pupil */}
            <motion.ellipse
              cx={cx}
              cy="50.8"
              rx="4"
              ry="4.5"
              fill="#180A28"
              animate={{ scale: m.pupilScale }}
              style={{ originX: `${cx}px`, originY: '50.8px' }}
              transition={{ duration: 0.2 }}
            />

            {/* Specular Sparkles */}
            <motion.circle
              cx={cx - 2.8}
              cy="47.5"
              r="2.5"
              fill="#FFFFFF"
              animate={{ opacity: m.sparkleOpacity }}
            />
            <motion.circle
              cx={cx + 2.8}
              cy="53"
              r="1.4"
              fill="#FFFFFF"
              animate={{ opacity: m.sparkleOpacity }}
            />

            {/* Upper Eyelash / Liner */}
            <path
              d={`M${cx - 10} 46.5 Q${cx} 41.5 ${cx + 10} 46.5`}
              fill="none"
              stroke="#1F162B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Eyelash wing flick */}
            <path
              d={i === 0 ? `M${cx - 9} 47 L${cx - 12} 44.5` : `M${cx + 9} 47 L${cx + 12} 44.5`}
              stroke="#1F162B"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      ))}

      {/* --- MOUTH --- */}
      <motion.path
        animate={{ d: m.mouthD, fill: m.mouthFill }}
        stroke="#1F162B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ duration: 0.2 }}
      />

      {/* --- FRONT ANIME BANGS & HAIR --- */}
      <path d="M22 45 C23 58 27 68 29 72 C28 65 26 55 26 46 Z" fill="#3D3456" />
      <path d="M78 45 C77 58 73 68 71 72 C72 65 74 55 74 46 Z" fill="#3D3456" />

      {/* Front bangs fringe */}
      <path
        d="M22 42 
           C26 26 74 26 78 42
           C73 40 68 45 66 48
           C64 42 59 40 55 48
           C53 41 48 39 46 48
           C43 41 36 41 33 49
           C30 43 25 43 22 42 Z"
        fill="#362E4E"
      />
      {/* Bangs highlight strip */}
      <path
        d="M28 36 Q50 30 72 36"
        stroke="#594B7D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Ahoge (Cowlick on top of hair) */}
      <motion.path
        d="M50 26 Q47 13 41 11 Q46 16 48 25"
        fill="#362E4E"
        animate={{ rotate: [-2, 4, -2] }}
        style={{ originX: '50px', originY: '26px' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />

      {/* --- MOOD SPECIFIC FX --- */}

      {/* Tired: Anime sweat drop on forehead */}
      <AnimatePresence>
        {mood === 'tired' && (
          <motion.path
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, 3, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ y: { repeat: Infinity, duration: 2 } }}
            d="M74 34 C74 34 71 39 71 41 C71 43 72.8 44.5 74.5 44.5 C76.2 44.5 78 43 78 41 C78 39 74 34 74 34 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="0.8"
          />
        )}
      </AnimatePresence>

      {/* Cry: Anime tears streaming from both eyes */}
      <AnimatePresence>
        {mood === 'cry' && (
          <>
            {[32, 68].map((x, i) => (
              <g key={x}>
                <motion.path
                  d={`M${x - 2} 54 Q${x - 4} 68 ${x - 1} 84 Q${x + 3} 68 ${x + 2} 54 Z`}
                  fill="url(#tearGrad)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0.85, 1.1, 0.85], opacity: 0.95 }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  style={{ originY: '54px' }}
                />
                <motion.ellipse
                  cx={x}
                  rx="2"
                  ry="3"
                  fill="#7DD3FC"
                  animate={{ cy: [78, 96], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.35, ease: 'easeIn' }}
                />
              </g>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.svg>
  )
}