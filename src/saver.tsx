import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import LeftDial from './pages/LeftDial.tsx'
import CenteredDial from './pages/CenteredDial.tsx'
import Horizon from './pages/Horizon.tsx'
import PanelDial from './pages/PanelDial.tsx'
import LockScreen from './pages/LockScreen.tsx'
import MacLock from './pages/MacLock.tsx'
import './index.css'

// Standalone entry for wallpaper and screen saver hosts: no router, no layout
// switcher, every path relative. Pick a layout with ?page=<name>.
const PAGES: Record<string, ReactElement> = {
  'left-edge': <LeftDial />,
  centered: <CenteredDial />,
  horizon: <Horizon />,
  panel: <PanelDial />,
  lockscreen: <LockScreen />,
  mac: <MacLock />,
  'mac-left': <MacLock side="left" />,
}

const page = new URLSearchParams(location.search).get('page') ?? 'mac-left'
document.documentElement.classList.add('standalone')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{PAGES[page] ?? PAGES['mac-left']}</StrictMode>,
)
