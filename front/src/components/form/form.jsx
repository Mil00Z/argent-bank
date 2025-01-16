import { useState } from "react";
import {useNavigate} from 'react-router';

import {useDispatch} from 'react-redux';
import {authSlice} from "../../redux/auth/slice";

import { useLoginMutation } from "@root/redux/auth/api";


import UserError from '@components/errors/userError'


const FormSignin = () => {


  const [inputUserEmail,setInputUserEmail] = useState('');
  const [inputUserPass,setInputUserPass] = useState();

  
  const navigate = useNavigate();

  const dispatch = useDispatch();


  // RTK Query API
  const [login, { data, error, isLoading }] = useLoginMutation();

  
  const triggerForm = async (e) => {

    //Not refresh
    e.preventDefault();


    let datas = {
      email: inputUserEmail,
      password: inputUserPass
    }

   
    //Ask to API if the access is OK
    const response = await login(datas).unwrap();

    console.log(response);

    if(response){

      dispatch(authSlice.actions.setUser(datas));
      
      dispatch(authSlice.actions.setToken(response.body.token));


      //Get local values in inputs
      stockDataInputs(datas);

      navigate('/user');

    }

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

    let localUser = inputUserEmail.substring(0, inputUserEmail.indexOf("@"));

    // Stock Credits in LocalStorage
    localStorage.setItem(`user-${localUser}`, JSON.stringify(datas));
    
  }


  // async function login(url,payload) {

  //   let params = {
  //     method:"POST",
  //     body: JSON.stringify(payload),
  //     headers : {
  //       "Content-Type":"application/json"
  //     }
  //   }

  //   try {

  //     const response = await fetch(url,params);
  //     const datas = await response.json();

  //     // console.log(datas);

  //       if (datas.status === 400) {

  //         setError(datas.message);

  //       } else {

  //         setError(null);

  //         localStorage.setItem(`user-token`, JSON.stringify(datas.body.token));

  //         navigate("/profile");

  //       }

  //   } catch (error) {
      
  //       setError('Error API Call : No datas Fetched');

  //       console.warn(error);

      
  //     }
    
  // }

 

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


      {error ? (<UserError errorFlow={error.data.message} layout={'login'} />) : null }

    </form>
  )
}
export default FormSignin