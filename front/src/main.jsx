import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'


import Root from '@pages/Root.jsx'
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import User from '@pages/User'
import NotFound from '@pages/NotFound'


import '@styles/main.scss'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children : [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: "*",
        element: <NotFound />}
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
