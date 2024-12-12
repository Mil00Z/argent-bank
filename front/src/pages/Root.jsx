import {Outlet,useLocation} from 'react-router'

import router from '@root/main.jsx'

import Navigation from '@components/navigation/navigation'
import Footer from '@components/footer/footer'


function Root () {

  const location = useLocation();

  let route = router.routes[0].children.find((element) => element.path === location.pathname)

  // console.log(route.pageClasses);

  return (
    <>
      <Navigation layout={'connect'} />
        <main className={`main ${route?.pageClasses}`}>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default Root
