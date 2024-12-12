import {Link} from 'react-router'
import logo from '@assets/logo-bank.png'

const NavigationLogged = (props) => {

  const {layout} = props

  return (
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
      <a className="main-nav-item" href="./user.html">
        <i className="fa fa-user-circle"></i>
        Tony
      </a>
      <a className="main-nav-item" href="./index.html">
        <i className="fa fa-sign-out"></i>
        Sign Out
      </a>
    </div>
  </nav>
)

}
export default NavigationLogged
