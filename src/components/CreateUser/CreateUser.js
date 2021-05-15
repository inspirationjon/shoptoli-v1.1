import './CreateUser.scss'
import { Bin } from '../Lib/Svg'

function CreateUser () {
   return (
      <div className="create-user">
         <form className="create-user__form">
            <input className="create-user__input" type="text" placeholder="username" />
            <input className="create-user__input" type="password" placeholder="password" />
            <button className="create-user__btn" type="submit">Create</button>
         </form>

         <ul className="create-user__list">
            <li className="create-user__item">
               <p className="create-user__text">shuhratbek</p>
               <button className="create-user__bin-btn"><Bin /></button>
            </li>
            <li className="create-user__item">
               <p className="create-user__text">shuhratbek</p>
               <button className="create-user__bin-btn"><Bin /></button>
            </li>
            <li className="create-user__item">
               <p className="create-user__text">shuhratbek</p>
               <button className="create-user__bin-btn"><Bin /></button>
            </li>
            <li className="create-user__item">
               <p className="create-user__text">shuhratbek</p>
               <button className="create-user__bin-btn"><Bin /></button>
            </li>
         </ul>
      </div>
   )
}

export default CreateUser
