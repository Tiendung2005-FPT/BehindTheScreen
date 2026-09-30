import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
export const socket = io()
export function useGame() {
  const [g, setG] = useState({ phase: 'lobby', endsAt: 0, feed: [], players: 0, board: [] })
  useEffect(() => { socket.on('state', setG); return () => socket.off('state', setG) }, [])
  return g
}
export function useCountdown(endsAt) {
  const [t, setT] = useState(0)
  useEffect(() => {
    const f = () => setT(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)))
    f(); const i = setInterval(f, 250); return () => clearInterval(i)
  }, [endsAt])
  return t
}
