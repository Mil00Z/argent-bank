import { useState,useEffect} from 'react'

import NavigationLogged from '@components/navigation/navigation-logged'
import UserError from '@components/errors/userError'


import '@styles/pages/_User.scss'



const User = () => {

  const [loged,isLoged] = useState(false);
  
  const [user,setUser] = useState({});

  //Check Datas User Profile
  async function checkUser(url,token){

    try {

      let response = await fetch(url,{
          method:"POST",
          headers : {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${JSON.parse(token)}`
          }
        });

        let datas = await response.json();

        console.log(datas);

        if (datas.status === 200) {

          // console.log(datas.body);

          isLoged(true);
          
          setUser((user) => datas.body);

        }
            
    } catch(error) {
      
        console.warn(error);
    }


  }

   
  useEffect(() => {

    if(localStorage.getItem('user-token') !== null){
       
      checkUser('http://localhost:3001/api/v1/user/profile',localStorage.getItem('user-token'));

    }

  }, []);


 
  return(

  <>
    {loged ? (
      <>
      <NavigationLogged layout={loged} />
      
        <div className="header">
          <h1 className="main-title">Welcome back<br />{user.firstName} {user.lastName}</h1>
          <button className="edit-button">Edit Name</button>
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
    ) : (
    <>
     
      <UserError />
     
    </>
    )
  }
</> 
    
  )
}
export default User