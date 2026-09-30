import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { socket, useGame, useCountdown } from './socket'
import { COMMENTS, POST } from './data'

const by = (t) => COMMENTS.filter((c) => c.type === t)
const pick1 = (a) => a[Math.floor(Math.random() * a.length)]
// Luôn có ít nhất 1 comment của mỗi loại + 1 comment ngẫu nhiên, rồi xáo trộn
function makeOptions() {
  const three = ['positive', 'neutral', 'negative'].map((t) => pick1(by(t)))
  const extra = pick1(COMMENTS.filter((c) => !three.includes(c)))
  return [...three, extra].sort(() => Math.random() - 0.5)
}

export default function Audience() {
  const g = useGame()
  const [name, setName] = useState('')
  const [opts, setOpts] = useState(makeOptions)
  const [gain, setGain] = useState(null)
  const [me, setMe] = useState(null)
  const left = useCountdown(g.endsAt)

  useEffect(() => {
    const join = () => socket.emit('join', (r) => setName(r.name))
    socket.on('connect', join); if (socket.connected) join()
    socket.on('me', setMe)
    return () => { socket.off('connect', join); socket.off('me', setMe) }
  }, [])

  const choose = (c) => {
    socket.emit('pick', c.id)
    setGain({ key: Date.now(), n: c.points })
    setOpts(makeOptions())
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
          <div className="flex justify-between text-sm">
            <span>⏱ {left}s</span>
            <span className="relative">👍 Kiếm nhiều like nhất!
              <AnimatePresence>{gain && <motion.b key={gain.key} initial={{ y: 0, opacity: 1 }} animate={{ y: -30, opacity: 0 }} className="absolute right-0 text-pink-400">+{gain.n}</motion.b>}</AnimatePresence>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {opts.map((c) => (
              <motion.button key={c.id} whileTap={{ scale: 0.96 }} onClick={() => choose(c)}
                className="text-left rounded-xl bg-slate-700 hover:bg-slate-600 p-4">{c.text}</motion.button>
            ))}
          </div>
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
