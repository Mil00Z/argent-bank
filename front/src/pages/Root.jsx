import {Outlet,useLocation} from 'react-router'
import PropTypes from 'prop-types'

import router from '@root/main.jsx'

import Navigation from '@components/navigation/navigation'
import Footer from '@components/footer/footer'


function Root () {

  const location = useLocation();

  let route = router.routes[0].children.find((element) => element.path === location.pathname)

  // console.log(route.pageClasses);

  
  return (
    <>
      <Navigation />
        <main className={`main ${route?.pageClasses || 'bg-dark'}`}>
          <Outlet context={'im g-root'} />
        </main>
      <Footer />
    </>
  )
}


// Outlet.propTypes = {
//   context: PropTypes.shape({
//     user: PropTypes.object.isRequired
//   }).isRequired
// }

Outlet.propTypes = {
  context:PropTypes.string  
}

export default Root
