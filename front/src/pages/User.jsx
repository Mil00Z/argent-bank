import { useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router'

import { useSelector,useDispatch} from 'react-redux';


import { userSlice } from '../redux/user/slice';
import { useGetUserMutation } from '../redux/user/api';

// UI Component
import UserEdit from '@components/userEdit/userEdit';
import UserError from '@components/errors/userError'


import '@styles/pages/_User.scss'


const User = () => {

  const [loged,setLoged] = useState(false);

  const [isEdit,setIsEdit] = useState(false);

  const [animate,setAnimate] = useState('');


  const token = useSelector(state => state.auth?.token);

  const user = useSelector(state => state.user?.userCredits)

  const dispatch = useDispatch();

  const navigate = useNavigate();



  // Hook from RTK Mutation
  const [getUser,{data,error,isLoading}] = useGetUserMutation();

  
  useEffect(() => {


    if(token){

        getUserProfile()

    } else {
      navigate('/login');
    }


  },[])



 // RTK query
 async function getUserProfile(){

  try{

    //Ask to API if the access is OK
    const response = await getUser().unwrap();

    dispatch(userSlice.actions.setUser(response.body));

    setLoged(true);

  } catch(error) {

    // console.warn(error);
  }

}


function triggerEditUser(){

      setIsEdit(isEdit => true);

      setAnimate(animate => true);
}



//Scenarii

// Animation avec quoi : Loader Maison ?
if(isLoading) return <h2>Loading...</h2>
 
if(!token) return <UserError />;


  return(
      <>
        <div className="header">
          <h1 className="main-title">Welcome back<br />{user?.firstName} {user?.lastName}</h1>
          <button className="edit-button" onClick={() => {triggerEditUser()}}>Edit Name</button>
        </div>
        
        {isEdit ? <UserEdit fadeIn={animate} isEdit={isEdit} setIsEdit={setIsEdit} /> : null}

        <h2 className="sr-only" data-user={user?.id}>Accounts</h2>
        <section className="account" data-transac='AZX123CDFGH'>
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <a className="transaction-button">View transactions</a>
          </div>
        </section>
        <section className="account" data-transac="GH456TRSDFG">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <a className="transaction-button">View transactions</a>
          </div>
        </section>
        <section className="account" data-transac="JKL789ERTYU">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <Link className="transaction-button" to="/account/transactions/" data-id={user?.id}>View transactions</Link>
          </div>
        </section>

    </>
      
  )
}
export default User