import { createBrowserRouter } from 'react-router'
import VariantNav from './components/VariantNav.tsx'
import LeftDial from './pages/LeftDial.tsx'
import CenteredDial from './pages/CenteredDial.tsx'
import Horizon from './pages/Horizon.tsx'
import PanelDial from './pages/PanelDial.tsx'
import LockScreen from './pages/LockScreen.tsx'
import MacLock from './pages/MacLock.tsx'
import NotFound from './pages/NotFound.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <VariantNav />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LeftDial /> },
      { path: 'centered', element: <CenteredDial /> },
      { path: 'horizon', element: <Horizon /> },
      { path: 'panel', element: <PanelDial /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'mac', element: <MacLock /> },
      { path: 'mac-left', element: <MacLock side="left" /> },
    ],
  },
], { basename: import.meta.env.BASE_URL })
