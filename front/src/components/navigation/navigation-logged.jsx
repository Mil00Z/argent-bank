import {Link, useOutletContext} from 'react-router'
import logo from '@assets/logo-bank.png'

const NavigationLogged = (props) => {

  const {layout} = props

  const {user} = useOutletContext();

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
      <Link className="main-nav-item" to="/user" data-user={`${user.lastName}-${user.firstName}`}>
        <i className="fa fa-user-circle"></i>
        {user.firstName}
      </Link>
      <Link className="main-nav-item" to="/">
        <i className="fa fa-sign-out"></i>
        Sign Out
      </Link>
      </div>
    </nav>
)
}
export default NavigationLogged
