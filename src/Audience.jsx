import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { socket, useGame, useCountdown } from './socket'
import { COMMENTS, POST, COOLDOWN_MS } from './data'

const by = (t) => COMMENTS.filter((c) => c.type === t)
const pick1 = (a) => a[Math.floor(Math.random() * a.length)]

// Lấy đúng 3 bình luận: 1 positive, 1 neutral, 1 negative rồi xáo trộn
function makeOptions() {
  return ['positive', 'neutral', 'negative']
    .map((t) => pick1(by(t)))
    .sort(() => Math.random() - 0.5)
}

const TYPE_COLORS = {
  positive: 'text-green-300',
  neutral: 'text-amber-200',
  negative: 'text-red-400',
}

export default function Audience() {
  const g = useGame()
  const [name, setName] = useState('')
  const [opts, setOpts] = useState(makeOptions)
  const [res, setRes] = useState(null) // kết quả của bình luận vừa chọn (đang cooldown)
  const [score, setScore] = useState(0)
  const [me, setMe] = useState(null)
  const left = useCountdown(g.endsAt)

  useEffect(() => {
    const join = () => socket.emit('join', (r) => setName(r.name))
    socket.on('connect', join); if (socket.connected) join()
    socket.on('me', setMe)
    return () => { socket.off('connect', join); socket.off('me', setMe) }
  }, [])

  // Mỗi lượt chơi mới: reset điểm
  useEffect(() => { setScore(0); setRes(null); setOpts(makeOptions()) }, [g.endsAt])

  const choose = (c) => {
    if (res) return
    socket.emit('pick', c.id, (r) => {
      if (!r?.ok) return
      setScore(r.score)
      setRes({ text: c.text, type: c.type, likes: r.likes })
      setTimeout(() => { setRes(null); setOpts(makeOptions()) }, COOLDOWN_MS)
    })
  }

  return (
    <div className="min-h-screen max-w-md mx-auto p-4 flex flex-col gap-4">
      <div className="text-xs text-slate-400 flex justify-between"><span>{name}</span><span>Ẩn danh 🎭</span></div>

      {g.phase === 'lobby' && <p className="m-auto text-center text-slate-300">Chờ người dẫn chương trình bắt đầu…</p>}

      {g.phase === 'play' && (
        <>
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="font-bold">{POST.user}</p>
            <p className="text-sm mt-1">{POST.text}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">⏱ {left}s</span>
            <span className="text-sm">Tổng điểm:{' '}
              <motion.b key={score} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="inline-block text-xl text-pink-400">{score}</motion.b>
            </span>
          </div>

          {res ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-slate-800 p-6 text-center">
              <p className={`text-sm ${TYPE_COLORS[res.type] || 'text-slate-300'}`}>“{res.text}”</p>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black text-pink-400 mt-4">+{res.likes} 👍</motion.p>
              <p className="mt-3 text-slate-300">Tổng điểm: <b>{score}</b></p>
              <div className="h-1.5 bg-slate-700 rounded mt-5 overflow-hidden">
                <motion.div className="h-full bg-pink-400" initial={{ width: '100%' }} animate={{ width: '0%' }}
                  transition={{ duration: COOLDOWN_MS / 1000, ease: 'linear' }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">Bình luận tiếp theo sắp mở…</p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              {opts.map((c) => (
                <motion.button
                  key={c.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => choose(c)}
                  className={`text-left rounded-xl bg-slate-700 hover:bg-slate-600 p-4 transition-colors ${TYPE_COLORS[c.type] || 'text-white'}`}
                >
                  {c.text}
                </motion.button>
              ))}
            </div>
          )}
        </>
      )}

      {g.phase === 'summary' && me && (
        <div className="m-auto text-center">
          <p className="text-slate-400">Điểm của bạn</p>
          <p className="text-6xl font-black text-pink-400">{me.score}</p>
          <p className="mt-2">Hạng {me.rank}/{me.total}</p>
          <p className="text-slate-400 mt-6 text-sm">Nhìn lên màn hình lớn…</p>
        </div>
      )}

      {g.phase === 'reveal' && me && (
        <div className="m-auto text-center">
          {me.neg > 0 ? (
            <>
              <p className="text-5xl">💔</p>
              <p className="text-xl mt-3">Bạn đã gửi <b className="text-red-400">{me.neg}</b> bình luận tiêu cực</p>
              <p className="text-slate-300 mt-2">để đổi lấy {me.score} like. Phía sau màn hình là một con người thật.</p>
            </>
          ) : (
            <>
              <p className="text-5xl">🤍</p>
              <p className="text-xl mt-3">Bạn đã chọn tử tế, dù ít like hơn.</p>
              <p className="text-slate-300 mt-2">Xây đi đôi với chống: hãy lên tiếng bênh vực nạn nhân.</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}