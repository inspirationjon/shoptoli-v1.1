import './ChangeInfo.scss'

function ChangeInfo () {
   return (
      <div>
         <form className="change-info__form">
            <input className="create-user__input" type="text" placeholder="Company name" />
            <input className="create-user__input" type="text" placeholder="Catalog link" />
            <input className="create-user__input" type="text" placeholder="Media link" />
            <input className="create-user__input" type="text" placeholder="Phone" />
            <input className="create-user__input" type="text" placeholder="Adress" />
            <input className="create-user__input" type="text" placeholder="Email" />
            <input className="create-user__input" type="text" placeholder="Delivery price" />
            <input className="create-user__input" type="text" placeholder="Free delivery limit" />
            <button className="create-user__btn change-btn" type="submit">Create</button>
         </form>
      </div>
   )
}

export default ChangeInfo
