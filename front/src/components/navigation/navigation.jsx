import {Link} from 'react-router'
import logo from '@assets/logo-bank.png'

import '@styles/layout/_navigation.scss'

const Navigation = (props) => {

  const {layout} = props;

  return(

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
        <Link className="main-nav-item debeug" to="/user">
            <i className="fa fa-user-square"></i>
            User
          </Link>
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
  )

}

export default Navigation