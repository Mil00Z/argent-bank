import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { useGetUserMutation} from '../../redux/user/api'
import { useUpdateUserMutation } from '../../redux/user/apiUpdate'

import {userSlice} from '../../redux/user/slice'


import '@styles/pages/_User.scss'



const UserEdit = (props) => {  

  const {fadeIn} = props

  //
  const user = useSelector(state => state.user?.userCredits);

  //Get Datas from Store
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);


  const dispatch = useDispatch();

  

  // Hook from RTK Mutation
  // const [getUser,{data,error,isLoading}] = useGetUserMutation();

  const [updateUser,{dataUpdateUser,errorUpdateUser,isLoadingUpdateUser}] = useUpdateUserMutation();



 

  async function handleSubmit(e) {

    e.preventDefault();

    //check si besoin de verif les inputs ?
    // voir si on doit récupérer ça différement qu'en JS natif direct ?

    // let name = document.querySelector('input[name="firstName"]').value;

    // let lastname = document.querySelector('input[name="lastName"]').value;


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

      // console.log(response);

      //Update Store
      if (!errorUpdateUser){
        dispatch(userSlice.actions.setUser(updatedDatasUser))
      }
      
    } catch(error){console.warn(error)}

  } 


  
return (
  <>
    <section className={`user-edit-container ${fadeIn ? 'pop-in' : ''}`}>

      <form action="" id="user-edit" className="ui-form">
    
      <div className="input-wrapper">

        <input type="text" name="firstName" defaultValue={user.firstName} placeholder='le prénom'  onChange={(e)=>{setFirstName(e.target.value)}}/>
        <input type="text" name="lastName" id="" defaultValue={user.lastName} placeholder='le nom' onChange={(e)=>{setLastName(e.target.value)}}/>
        <input type="email" name="email" id="" defaultValue={user.email} placeholder='le mail' onChange={(e)=>{setEmail(e.target.value)}}/>

      </div>

      {!user ? ( <button type="submit" disabled className="btn freezed-button">Waiting for autorisation</button>):( 
        <>
        <div className="btn-wrapper">

          <button type="submit" className="btn sign-in-button" onClick={(e) => {handleSubmit(e)}}>Mettre à jour</button>

          <button className='btn cancel-button' disabled>Cancel</button>

        </div>
           
        </>

        )}
       
      </form>

    </section>
  </>
)
}
export default UserEdit