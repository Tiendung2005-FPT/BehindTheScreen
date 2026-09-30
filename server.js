import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { COMMENTS, DURATION } from './src/data.js'

const HOST_KEY = process.env.HOST_KEY || 'host'
const app = express()
const srv = http.createServer(app)
const io = new Server(srv, { cors: { origin: '*' } })
app.use(express.static('dist'))
app.get('*', (_, r) => r.sendFile(path.resolve('dist/index.html')))

const s = { phase: 'lobby', endsAt: 0, feed: [] }
const players = new Map()
let timer

const board = () => [...players.values()].sort((a, b) => b.score - a.score)
const pub = () => ({
  phase: s.phase, endsAt: s.endsAt, feed: s.feed.slice(-200),
  players: players.size,
  board: board().slice(0, 5).map(({ name, score }) => ({ name, score })),
})
const sync = () => io.emit('state', pub())
const sendMe = () => {
  const b = board()
  for (const [id, p] of players)
    io.to(id).emit('me', { score: p.score, neg: p.neg, harm: p.harm, rank: b.indexOf(p) + 1, total: b.length })
}
const setPhase = (p) => { s.phase = p; if (p === 'summary' || p === 'reveal') sendMe(); sync() }

io.on('connection', (socket) => {
  socket.on('join', (cb) => {
    const name = 'Ẩn danh #' + Math.floor(100 + Math.random() * 900)
    players.set(socket.id, { name, score: 0, neg: 0, harm: 0 })
    cb?.({ name }); sync()
  })
  socket.on('pick', (id) => {
    const p = players.get(socket.id), c = COMMENTS.find((x) => x.id === id)
    if (!p || !c || s.phase !== 'play' || Date.now() > s.endsAt) return
    const likes = Math.max(1, c.points + Math.round((Math.random() - 0.3) * c.points * 0.2))
    p.score += likes
    if (c.type === 'negative') { p.neg++; p.harm += c.harm }
    s.feed.push({ key: Date.now() + Math.random(), text: c.text, type: c.type, likes, harm: c.harm || 0, by: p.name })
    sync()
  })
  socket.on('host', (key, action) => {
    if (key !== HOST_KEY) return
    if (action === 'start') {
      players.forEach((p) => Object.assign(p, { score: 0, neg: 0, harm: 0 }))
      s.feed = []; s.endsAt = Date.now() + DURATION * 1000
      clearTimeout(timer); timer = setTimeout(() => setPhase('summary'), DURATION * 1000 + 300)
      setPhase('play')
    } else if (action === 'summary') setPhase('summary')
    else if (action === 'reveal') setPhase('reveal')
    else if (action === 'reset') { clearTimeout(timer); s.feed = []; players.forEach((p) => Object.assign(p, { score: 0, neg: 0, harm: 0 })); setPhase('lobby') }
  })
  socket.on('disconnect', () => { players.delete(socket.id); sync() })
})

const PORT = process.env.PORT || 3000
srv.listen(PORT, '0.0.0.0', () => console.log('Server chạy tại cổng ' + PORT))