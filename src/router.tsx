import { createBrowserRouter } from 'react-router'
import VariantNav from './components/VariantNav.tsx'
import LeftDial from './pages/LeftDial.tsx'
import CenteredDial from './pages/CenteredDial.tsx'
import Horizon from './pages/Horizon.tsx'
import PanelDial from './pages/PanelDial.tsx'
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
    ],
  },
], { basename: import.meta.env.BASE_URL })
