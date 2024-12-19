import { useState, useEffect } from 'react'
import {Link} from 'react-router'
import logo from '@assets/logo-bank.png'

import '@styles/layout/_navigation.scss'

const Navigation = (props) => {

  const {layout = 'default', user} = props;

  const [isLogin,setIsLogin] = useState(false);



  useEffect(() => {  

    // let token = localStorage.getItem(`user-token`);

    if (localStorage.getItem(`user-token`)) {

      setIsLogin(true)

    }  

  },[]);


  const handleLogout = () => {

    localStorage.removeItem(`user-token`);
    setIsLogin(false); 
  
}



  return(

    (!isLogin) ? ( 
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/" aria-label="lien vers la page d'accueil">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    </>
      ) : (
  <nav className="main-nav">
      <Link className="main-nav-logo" to="/" aria-label="lien vers la page d'accueil">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
          <Link className="main-nav-item" to="/user" data-user={`${user.lastName}-${user.firstName}`}>
            <i className="fa fa-user-circle"></i>
            {user.firstName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
      </div>
    </nav>
    )  
  )
}
export default Navigation