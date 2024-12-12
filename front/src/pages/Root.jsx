import {Outlet,useLocation} from 'react-router'
import PropTypes from 'prop-types'

import router from '@root/main.jsx'

import Navigation from '@components/navigation/navigation'
import Footer from '@components/footer/footer'


function Root () {

  const location = useLocation();

  let route = router.routes[0].children.find((element) => element.path === location.pathname)

  // console.log(route.pageClasses);

  let user =   {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    id: 1
  };


  return (
    <>
      <Navigation layout={'connect'} />
        <main className={`main ${route?.pageClasses}`}>
          <Outlet context={{user}} />
        </main>
      <Footer />
    </>
  )
}

Outlet.propTypes = {
  context: PropTypes.shape({
    user: PropTypes.object.isRequired
  }).isRequired
}

export default Root
