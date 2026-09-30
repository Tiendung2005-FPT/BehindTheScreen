import { motion, AnimatePresence } from 'framer-motion'

// Emotion configurations
const MOOD_DATA = {
  happy: {
    skin: '#FFEFE6',
    blushOpacity: 0.65,
    mouthD: 'M44 68 Q50 77 56 68 Z', // happy open smile showing tongue
    mouthFill: '#FF6B8B',
    browL: { y1: 34, y2: 36 },
    browR: { y1: 36, y2: 34 },
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
    browL: { y1: 37, y2: 36 },
    browR: { y1: 36, y2: 37 },
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
    browL: { y1: 38, y2: 32 },
    browR: { y1: 32, y2: 38 },
    eyeScaleY: 1.1,
    pupilScale: 0.45, // shrunk anime terror pupils
    sparkleOpacity: 0,
    headShake: { x: [-1.5, 1.5, -1, 1, 0], y: [-0.5, 0.5, 0] },
    transition: { repeat: Infinity, duration: 0.15 },
  },
  cry: {
    skin: '#FFF3F3', // tender flushed skin
    blushOpacity: 0.8, // flushed cheeks
    // Soft quivering whimpering mouth (downcurved & trembling)
    mouthD: 'M44 72 Q50 68 56 72',
    mouthFill: 'transparent',
    // Classic anime sad brows (inner corners arched up, outer corners drooping down)
    browL: { y1: 37, y2: 31 },
    browR: { y1: 31, y2: 37 },
    eyeScaleY: 0.85, // slightly tightened/squeezed eyes
    pupilScale: 1.05,
    sparkleOpacity: 1,
    // Gentle sniffing/sobbing hiccup
    headShake: { y: [0, -1.8, 0, 0.8, 0] },
    transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
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
          <stop offset="0%" stopColor="#FF4B72" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FF4B72" stopOpacity="0" />
        </radialGradient>

        {/* Anime eye iris gradient */}
        <linearGradient id="eyeIris" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A1E6D" />
          <stop offset="45%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#C77DFF" />
        </linearGradient>

        {/* Shimmering tear highlight */}
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.5" />
        </linearGradient>

        {/* Scared shadow gradient */}
        <linearGradient id="dreadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* --- BACK HAIR & TWIN LOCKS --- */}
      <path d="M20 42 C12 60 14 85 24 88 C27 82 25 60 27 50" fill="#2B263E" />
      <path d="M80 42 C88 60 86 85 76 88 C73 82 75 60 73 50" fill="#2B263E" />
      <circle cx="50" cy="50" r="37" fill="#241E34" />

      {/* --- EARS --- */}
      <circle cx="21" cy="54" r="5" fill="#FAD1C5" />
      <circle cx="79" cy="54" r="5" fill="#FAD1C5" />

      {/* --- FACE BASE --- */}
      <motion.path
        animate={{ fill: m.skin }}
        transition={{ duration: 0.3 }}
        d="M23 48 C23 34 35 27 50 27 C65 27 77 34 77 48 C77 65 63 78 50 82 C37 78 23 65 23 48 Z"
      />

      {/* Scared / Dread Shadow */}
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
        rx="8.5"
        ry="4.5"
        fill="url(#blushGrad)"
        animate={{ opacity: m.blushOpacity }}
        transition={{ duration: 0.2 }}
      />
      <motion.ellipse
        cx="67"
        cy="59"
        rx="8.5"
        ry="4.5"
        fill="url(#blushGrad)"
        animate={{ opacity: m.blushOpacity }}
        transition={{ duration: 0.2 }}
      />

      {/* Reddened nose bridge (gives that vulnerable crying look) */}
      {mood === 'cry' && (
        <motion.ellipse
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          cx="50"
          cy="60"
          rx="4.5"
          ry="2"
          fill="#FF4B72"
        />
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
            transition={{ duration: 0.25 }}
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
            {/* Sclera */}
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

            {/* Glossy Highlights */}
            <motion.circle
              cx={cx - 2.8}
              cy={mood === 'cry' ? 49 : 47.5}
              r={mood === 'cry' ? 3.2 : 2.5}
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
            {/* Eyelash wing */}
            <path
              d={i === 0 ? `M${cx - 9} 47 L${cx - 12} 44.5` : `M${cx + 9} 47 L${cx + 12} 44.5`}
              stroke="#1F162B"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Welled-up glassy water pool along bottom eyelid */}
            {mood === 'cry' && (
              <motion.path
                d={`M${cx - 6} 53 Q${cx} 57.5 ${cx + 6} 53 Q${cx} 55.5 ${cx - 6} 53 Z`}
                fill="url(#waterGrad)"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            )}
          </motion.g>
        </g>
      ))}

      {/* --- MOUTH --- */}
      <g>
        {/* Main mouth stroke */}
        <motion.path
          animate={{ d: m.mouthD, fill: m.mouthFill }}
          stroke="#1F162B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{ duration: 0.25 }}
        />
        {/* Subtle whimpering lower-lip shadow for crying */}
        {mood === 'cry' && (
          <motion.path
            d="M48 74.5 Q50 75.8 52 74.5"
            stroke="#C97A8E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
          />
        )}
      </g>

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
      {/* Bangs highlight */}
      <path
        d="M28 36 Q50 30 72 36"
        stroke="#594B7D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Ahoge (Cowlick) */}
      <motion.path
        d="M50 26 Q47 13 41 11 Q46 16 48 25"
        fill="#362E4E"
        animate={mood === 'cry' ? { rotate: [-10, -5, -10] } : { rotate: [-2, 4, -2] }}
        style={{ originX: '50px', originY: '26px' }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />

      {/* --- MOOD SPECIFIC FX --- */}

      {/* Tired: Sweat drop */}
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

      {/* Cry: Glistening tear trails & rolling droplets */}
      <AnimatePresence>
        {mood === 'cry' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Delicate glistening tear trails running down cheeks */}
            <path
              d="M32 55 Q30 65 31 75"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M68 55 Q70 65 69 75"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Tear droplet falling from left cheek */}
            <motion.ellipse
              cx="31"
              rx="1.6"
              ry="2.4"
              fill="#E0F2FE"
              stroke="#7DD3FC"
              strokeWidth="0.5"
              animate={{ cy: [56, 78], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeIn' }}
            />

            {/* Tear droplet falling from right cheek (offset timing) */}
            <motion.ellipse
              cx="69"
              rx="1.6"
              ry="2.4"
              fill="#E0F2FE"
              stroke="#7DD3FC"
              strokeWidth="0.5"
              animate={{ cy: [56, 78], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.6, ease: 'easeIn' }}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </motion.svg>
  )
}