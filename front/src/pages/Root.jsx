import {Outlet} from 'react-router'

import Navigation from '@components/navigation/navigation'
import Footer from '@components/footer/footer'


function Root () {
 
  return (
    <>
      <Navigation layout={'connect'} />
        <Outlet />
      <Footer />
    </>
  )
}

export default Root
