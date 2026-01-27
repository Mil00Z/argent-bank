import { useState,useEffect } from "react";
import {useNavigate} from 'react-router';

import {useDispatch,useSelector} from 'react-redux';
import {authSlice} from "../../redux/auth/slice";

import { useLoginMutation } from "@root/redux/auth/api";


import UserError from '@components/errors/userError'


const FormSignin = () => {


  const [inputUserEmail,setInputUserEmail] = useState('');
  const [inputUserPass,setInputUserPass] = useState();

  const navigate = useNavigate();

  const token = useSelector(state => state.auth?.token);

  const userCredits = useSelector(state => state.user?.userCredits);

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
    try{

      const response = await login(datas).unwrap();

      if(response) {
      
      dispatch(authSlice.actions.setToken(response.body.token));

      //Get local values in inputs
      stockDataInputs(datas);

      navigate('/profile');

    }

    } catch(error) {
      //  return (<UserError>'wtf'</UserError>)
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

    } else {

      //  return (<UserError>{value}</UserError>)
    }

}

  function handleAlreadyLogin(e) {
    
    let isChecked = e.target.checked;

    if (!isChecked) {

      localStorage.clear();

    } else {

      // console.log(userCredits, localStorage);

      stockDataInputs(userCredits);

    }
  } 

  function stockDataInputs(datas) {

    let localUser = inputUserEmail.substring(0, inputUserEmail.indexOf("@")) ?? 'random';

    // Stock Credits in LocalStorage
    localStorage.setItem(`user-${localUser}`, JSON.stringify(datas));
    
  }


  useEffect(() => {

      if(token){
        stockDataInputs(userCredits);
      }

   }, [token]);


   
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
            <input type="checkbox" id="remember-me" onChange={(e) => handleAlreadyLogin(e)} />
            <label htmlFor="remember-me" >Remember me</label>
      </div>

      <button className="btn sign-in-button">Sign In</button>


      {error ? (<UserError errorFlow={error.error ?? 'Error API Call : No datas Fetched'} layout={'login'} />) : null }

    </form>
  )
}
export default FormSignin