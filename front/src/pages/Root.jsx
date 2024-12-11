import {Outlet} from 'react-router'

import SignIn from '@pages/SignIn'
import Home from '@pages/Home'
import User from '@pages/User'

import '@styles/App.css'
import '@styles/main.css'

function Root () {
 
  return (
    <>
      <Outlet />
    </>
  )
}

export default Root
