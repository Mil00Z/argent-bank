import { Link } from 'react-router';
import '@styles/pages/_Signin.scss';

const SignIn = () => {
  
  return (
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Link to="/user" className="sign-in-button">
            Sign In
          </Link>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
  )

}

export default SignIn;