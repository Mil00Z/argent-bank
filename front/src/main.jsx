import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Root from '@pages/Root.jsx'
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children : [
      {
        path: '/',
        element: <SignIn />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
