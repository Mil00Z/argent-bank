import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router'
import { useStore,useSelector } from 'react-redux'

import { authSlice } from '../../redux/auth/slice'
import { userSlice } from '../../redux/user/slice'

//Assets
import logo from '@assets/logo-bank.png'

import '@styles/layout/_navigation.scss'




const Navigation = () => {

  const store = useStore();

  const token = useSelector(state => state.auth?.token);

  const user = useSelector(state => state.user?.userCredits);

  const lastUpdated = useSelector(state => state.user?.userCredits?.updatedAt);


  let formatedDate = new Date(lastUpdated).toLocaleDateString('fr-FR');


  const [isLoged, setIsLoged] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {


    if (token) {

      setIsLoged(isLoged => true)

    } 

  }, [token]);



  
  const handleLogout = () => {


    store.dispatch(authSlice.actions.reset());

    store.dispatch(userSlice.actions.reset());
    
    setIsLoged(false);

    //Redirection 
    navigate('/')

  }



  return (

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

          {!isLoged ?

            (<Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>) : 
            (<>
              <Link className="main-nav-item" to="/profile" data-user={`${user?.lastName}-${user?.firstName}`}>
                    <i className="fa fa-user-circle"></i>
                    {user?.firstName}
                    <span className="another-datas"> dernier update : {formatedDate}</span>
              </Link>
              <button className="main-nav-item" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
              </button>
            </>)
            }
          </div>
      </nav>
    </>
  )
}
export default Navigation