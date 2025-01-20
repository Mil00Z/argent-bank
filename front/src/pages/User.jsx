import { useState,useEffect} from 'react'
import {useNavigate} from 'react-router'

import { useSelector,useDispatch} from 'react-redux';


import { userSlice } from '../redux/user/slice';
import { useGetUserMutation } from '../redux/user/api';

import UserError from '@components/errors/userError'


import '@styles/pages/_User.scss'




const User = () => {

  const [loged,setLoged] = useState(false);

  const token = useSelector(state => state.auth?.token);

  const user = useSelector(state => state.user?.userCredits)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Hook from RTK Mutation
  const [getUser,{data,error,isLoading}] = useGetUserMutation();

  
  useEffect(() => {

    // console.log('recorded token',token);

    if(token){

      checkUser('http://localhost:3001/api/v1/user/profile',token);
    } else {
      navigate('/login');
    }

    // getUserProfile()

  },[])



 // RTK query
 async function getUserProfile(){

  try{

    //Ask to API if the access is OK
    const response = await getUser().unwrap();

      console.log(response);
 
    return response

  } catch(error) {

    console.warn(error);
  }

}

  
  // Fetch Standard Query
  async function checkUser(url,token){

    try {

      let response = await fetch(url,{
          method:"POST",
          headers : {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        let datas = await response.json();

        if (datas.status === 200) {

          dispatch(userSlice.actions.setUser(datas.body));

          setLoged(true);

          console.log(datas.body)

          console.table(user)
        } 
            
    } catch(error) {
      
        console.warn(error);
    }

  
  }



   
  // useEffect(() => {

  //   //Limiter la portée + Syntaxe standard avec useEffect (car async n'est pas possible sur UseEffect)
  //   async function checkUserStorage(){


  //     if(localStorage.getItem('user-token')){
  
  //       navigate('/login');
         
  //     } else {
  
  //       await checkUser('http://localhost:3001/api/v1/user/profile',token);

  //       setLoading(false);
  
  //     }

  //   }

  //   checkUserStorage()
    

  // }, []);


if(isLoading) return <h2>Loading...
  <p>{ token ? token : 'No Token'}</p> 
</h2>
 
if(!loged) return <UserError />;

  return(
      <>
        <div className="header">
          <h1 className="main-title">Welcome back<br />{user.firstName} {user.lastName}</h1>
          <button className="edit-button" onClick={alert('Edit Name')}>Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account" data-user={user.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
    </>
      
  )
}
export default User