import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { useUpdateUserMutation } from '../../redux/user/apiUpdate'

import {userSlice} from '../../redux/user/slice'


import '@styles/pages/_User.scss'


const UserEdit = ({fadeIn,isEdit,setIsEdit}) => {  

   // Hook from RTK Mutation
   const [updateUser,{dataUpdateUser,errorUpdateUser,isLoadingUpdateUser}] = useUpdateUserMutation();


  //Get Datas from Store
  const user = useSelector(state => state.user?.userCredits);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [createdAt, setCreatedAt] = useState(user.createdAt);
  


  const dispatch = useDispatch();


  function dateFormat(incomingDate) {

    const date = new Date(incomingDate);
    
    return date.toLocaleString('fr-FR');
  }


  async function handleSubmit(e) {

    e.preventDefault();

  
    const updatedDatasUser = {
      ...user,
      firstName:firstName,
      lastName:lastName,
      email:email
    }

    
   
    //Update API
    try{

      const response = await updateUser({
        firstName:firstName,
        lastName:lastName,
        email:email
      }).unwrap();

    
      //Update Store
      if (!errorUpdateUser){
        dispatch(userSlice.actions.setUser(updatedDatasUser))
      }
      
    } catch(error){console.warn(error)}

  } 


  function cancelPanelUser(e) {

    e.preventDefault();
    setIsEdit((isEdit) => false);
  
}



 
return (
  <>
    <section className={`user-edit-container ${fadeIn ? 'pop-in' : 'pop-out'}`}>

      <form action="" id="user-edit" className="ui-form">
    
      <div className="input-wrapper">

        <input type="text" name="firstName" defaultValue={user.firstName} placeholder='le prénom'  onChange={(e)=>{setFirstName(e.target.value)}}/>
        <input type="text" name="lastName" id="" defaultValue={user.lastName} placeholder='le nom' onChange={(e)=>{setLastName(e.target.value)}}/>
        <input type="email" name="email" id="email" disabled defaultValue={user.email} placeholder='le mail' onChange={(e)=>{setEmail(e.target.value)}}/>

      <div className="input-date">Compte crée le : {dateFormat(createdAt)}</div>
      </div>

      {!user ? ( <button type="submit" disabled className="btn freezed-button">Waiting for autorisation</button>):( 
        <>
        <div className="btn-wrapper">

          <button type="submit" className="btn sign-in-button" onClick={(e) => {handleSubmit(e)}}>Mettre à jour</button>

          <button className='btn cancel-button' onClick={(e) => {cancelPanelUser(e)}}>Cancel</button>

        </div>
           
        </>

        )}
       
      </form>

    </section>
  </>
)
}
export default UserEdit