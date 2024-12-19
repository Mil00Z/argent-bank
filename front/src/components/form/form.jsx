import { useState } from "react";
import {useOutletContext, useNavigate} from 'react-router';


const FormSignin = () => {

  const {user} = useOutletContext();

  const [inputUserEmail,setInputUserEmail] = useState('');
  const [inputUserPass,setInputUserPass] = useState();

  
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  

  const triggerForm = (e) => {

    //Not refresh
    e.preventDefault();

    let datas = {
      email: inputUserEmail,
      password: inputUserPass
    }

    //Ask to API if the access is OK
    login('http://localhost:3001/api/v1/user/login',datas);

  
    //Get local values in inputs
    stockDataInputs(datas);

    
  };


  const getUserEmail = (value) => {
    
    let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

    if (value.length > 6 && emailRegex.test(value)) {

      setInputUserEmail(value);
    
    }

  }

  const getUserPass = (value) => {

    let regExTest = new RegExp("^[a-zA-Z0-9_-]+$");

    if(value.length > 6 && regExTest.test(value)) {

      setInputUserPass(value);

    } 

}


  function stockDataInputs(datas) {

    // let form = document.querySelector(`${target}`);

    // let formDatas = new FormData(form);

    // Stock Credits in LocalStorage
    localStorage.setItem(`user-machin`, JSON.stringify(datas));
    
  }

  function checkUserStorage() {

    let checkUser = JSON.parse(localStorage.getItem(`user-${inputUsername}`)) || false;

      return checkUser

  }

  async function login(url,payload) {

    let params = {
      method:"POST",
      body: JSON.stringify(payload),
      headers : {
        "Content-Type":"application/json"
      }
    }

    try {

      const response = await fetch(url,params);
      const datas = await response.json();

      // console.log(datas);

        if (datas.status === 400) {

          setError(datas.message);

        } else {

          setError(null);

          localStorage.setItem(`user-token`, JSON.stringify(datas.body.token));

          navigate("/user/");

        }

    } catch (error) {
      
        setError('Error API Call : No datas Fetched');

        console.warn(error);

      
      }
    
  }

 

  return(
    <form id="signin" onSubmit={triggerForm}>

      <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input type="email" placeholder="Votre identifiant" id="email" name="email" onChange={(e) => getUserEmail(e.target.value)} />
      </div>
      <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="*********"  onChange={(e) =>getUserPass(e.target.value)} />
      </div>
      <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>


      {error ? (<p className="error">{error}</p>) : null }

    </form>
  )
}
export default FormSignin