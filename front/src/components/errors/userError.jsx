const UserError = (props) => {

  const {errorFlow,layout} = props

  console.log(errorFlow,layout);

  return(
    
    <section className="user-error-container">
        <p className="error">
          {errorFlow}
            {/* {layout === 'login' ? 'de la Connexion' : 'du Profil'} */}
        </p>
    </section>

)
}
export default UserError