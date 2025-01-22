import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { useGetUserMutation} from '../../redux/user/api'
import { useUpdateUserMutation } from '../../redux/user/apiUpdate'

import {userSlice} from '../../redux/user/slice'


import '@styles/pages/_User.scss'



const UserEdit = (props) => {  

  const {fadeIn} = props

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const user = useSelector(state => state.user?.userCredits);

  const token = useSelector(state => state.auth?.token);


  // Hook from RTK Mutation
  const [getUser,{data,error,isLoading}] = useGetUserMutation();

  const [updateUser,{dataUpdateUser,errorUpdateUser,isLoadingUpdateUser}] = useUpdateUserMutation();

  const dispatch = useDispatch();

 

  async function handleSubmit(e) {

    e.preventDefault();

    //check si besoin de verif les inputs ?
    // voir si on doit récupérer ça différement qu'en JS natif direct ?

    let name = document.querySelector('input[name="firstName"]').value;

    let lastname = document.querySelector('input[name="lastName"]').value;


    const updatedDatasUser = {
      ...user,
      firstName:name,
      lastName:lastname
    }

    //Update Store
    dispatch(userSlice.actions.setUser(updatedDatasUser))
   
    //Update API
    try{

      const response = await updateUser({firstName:name,lastName:lastname}).unwrap();

      console.log(response);

    } catch(error){console.warn(error)}

    
  } 


  
return (
  <>
    <section className={`user-edit-container ${fadeIn ? 'pop-in' : ''}`}>

      <form action="" id="user-edit" className="ui-form">
    
      <div className="input-wrapper">

        <input type="text" name="firstName" defaultValue={user.firstName} placeholder='le prénom'  onChange={(e)=>{setFirstName(e.target.value)}}/>
        <input type="text" name="lastName" id="" defaultValue={user.lastName} placeholder='le nom' onChange={(e)=>{setLastName(e.target.value)}}/>

      </div>

      {!user ? ( <button type="submit" disabled className="btn freezed-button">Waiting for autorisation</button>):( <button type="submit" className="btn sign-in-button" onClick={(e) => {handleSubmit(e)}}>Mettre à jour</button>)}
       
      </form>

    </section>
  </>
)
}
export default UserEdit