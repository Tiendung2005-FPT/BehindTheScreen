import { createRoot } from 'react-dom/client'
import './index.css'
import Audience from './Audience.jsx'
import Screen from './Screen.jsx'
createRoot(document.getElementById('root')).render(
  location.pathname.startsWith('/screen') ? <Screen /> : <Audience />
)
