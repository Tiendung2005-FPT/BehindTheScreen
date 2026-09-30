import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { socket, useGame, useCountdown } from './socket'
import { POST } from './data'
import Avatar from './Avatar'

const key = new URLSearchParams(location.search).get('key') || 'host'
const host = (a) => socket.emit('host', key, a)

// Đồng bộ màu chữ với màn hình người chơi:
const color = {
  positive: 'text-green-300',
  neutral: 'text-amber-200',
  negative: 'text-red-400'
}

export default function Screen() {
  const g = useGame()
  const left = useCountdown(g.endsAt)
  const reveal = g.phase === 'reveal'

  // Giới hạn tối đa 20 bình luận tiêu cực (lấy 20 bình luận gần nhất)
  const negs = useMemo(
    () => g.feed.filter((c) => c.type === 'negative').slice(-20),
    [g.feed, reveal]
  )
  const [i, setI] = useState(0)

  // Pha 2: phát lại từng bình luận xấu, biểu cảm đổi dần (tối đa 20 * 1.8s = 36s)
  useEffect(() => {
    if (!reveal) return setI(0)
    const t = setInterval(() => setI((x) => Math.min(x + 1, negs.length)), 1800)
    return () => clearInterval(t)
  }, [reveal, negs.length])
  const r = negs.length ? i / negs.length : 0
  const mood = r < 0.25 ? 'happy' : r < 0.55 ? 'tired' : r < 0.85 ? 'scared' : 'cry'
  const current = negs[i - 1]

  return (
    <div className="h-screen flex flex-col p-8 overflow-hidden">
      <div className="fixed top-2 right-2 flex gap-2 opacity-20 hover:opacity-100 text-xs z-50">
        {['start', 'summary', 'reveal', 'reset'].map((a) => (
          <button key={a} onClick={() => host(a)} className="bg-slate-700 px-2 py-1 rounded">
            {a}
          </button>
        ))}
      </div>

      {g.phase === 'lobby' && (
        <div className="m-auto text-center">
          <h1 className="text-5xl font-black mb-8">Đằng Sau Màn Hình</h1>
          <div className="bg-white p-4 rounded-2xl inline-block"><QRCodeSVG value={location.origin} size={280} /></div>
          <p className="mt-6 text-2xl">Quét mã để tham gia · {g.players} người</p>
        </div>
      )}

      {(g.phase === 'play' || reveal) && (
        <div className="flex flex-1 gap-8 min-h-0">
          <motion.div layout animate={{ width: reveal ? '30%' : '100%', opacity: reveal ? 0.35 : 1 }} transition={{ duration: 1.2 }} className="flex flex-col min-h-0">
            <div className="rounded-xl bg-slate-800 p-4 mb-3">
              <p className="font-bold">{POST.user}</p><p>{POST.text}</p>
              {g.phase === 'play' && <p className="mt-2 text-slate-400">⏱ {left}s · {g.feed.length} bình luận</p>}
            </div>
            <div className="flex-1 overflow-hidden flex flex-col-reverse gap-2">
              <AnimatePresence initial={false}>
                {g.feed.slice(-14).map((c) => (
                  <motion.div key={c.key} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg bg-slate-900 px-4 py-2 flex justify-between gap-4 ${color[c.type] || 'text-white'}`}>
                    <span><b className="text-slate-500 mr-2">{c.by}</b>{c.text}</span>
                    <span className="text-pink-400 shrink-0">👍 {c.likes}</span>
                  </motion.div>
                )).reverse()}
              </AnimatePresence>
            </div>
          </motion.div>

          {reveal && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
              className="flex-1 flex flex-col items-center justify-center">
              <div className="h-20 mb-4 text-2xl text-center text-red-400 max-w-xl">
                <AnimatePresence mode="wait">
                  {current && <motion.p key={current.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>“{current.text}”</motion.p>}
                </AnimatePresence>
              </div>
              <div className="w-80 h-80"><Avatar mood={mood} /></div>
              <p className="mt-4 text-xl text-slate-300">{POST.victim}</p>
              {i >= negs.length && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-3xl font-bold text-center">
                  Mạng xã hội là ảo — tổn thương là thật.
                </motion.p>
              )}
            </motion.div>
          )}
        </div>
      )}

      {g.phase === 'summary' && (
        <div className="m-auto text-center">
          <h2 className="text-4xl font-black mb-6">Bảng xếp hạng like</h2>
          {g.board.map((p, n) => <p key={p.name} className="text-3xl my-2">{['🥇', '🥈', '🥉'][n] || n + 1} {p.name} — <b className="text-pink-400">{p.score}</b></p>)}
          <p className="mt-8 text-slate-400">Nhưng cái giá của những lượt like ấy là gì?</p>
        </div>
      )}
    </div>
  )
}