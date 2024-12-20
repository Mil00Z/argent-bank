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
        pageClasses :'home'
      },
      {
        path: '/login',
        element: <SignIn />,
        pageClasses :'signin bg-dark'
      },
      {
        path: '/profile',
        element: <User />,
        pageClasses :'user'
      },
      {
        path: "*",
        element: <NotFound />,
        pageClasses :'debeug'}
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

export default router;