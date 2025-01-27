import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router'

import { Provider } from "react-redux"
import { store } from '@root/redux/store'


import Root from '@pages/Root.jsx'
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import User from '@pages/User'
import NotFound from '@pages/NotFound'
import UserTransaction from '@pages/UserTransaction'

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
      },{
        path:'/account/transactions',
        element: <UserTransaction />,
        pageClasses :'transaction bg-dark'
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

export default router;