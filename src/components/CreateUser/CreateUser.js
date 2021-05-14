import './CreateUser.scss'

function CreateUser () {
   return (
      <div className="create-user">
         <form className="create-user__form">
            <input className="create-user__input" type="text" placeholder="username" />
            <input className="create-user__input" type="password" placeholder="password" />
            <button className="create-user__btn" type="submit">Create</button>
         </form>
      </div>
   )
}

export default CreateUser
