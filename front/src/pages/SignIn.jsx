

import FormSignin from '@components/form/form';
import '@styles/pages/_Signin.scss';

const SignIn = () => {

  return (
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <FormSignin />
      </section>
  )

}

export default SignIn;