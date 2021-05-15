import './CreateUser.scss'
import { Bin } from '../Lib/Svg'
import { useEffect, useRef, useState } from 'react'

function CreateUser() {
   const [count, setCount] = useState(0)
   const [users, setUsers] = useState([])
   const username = useRef()
   const password = useRef()

   function createUserFetch(evt) {
      evt.preventDefault()

      const data = {
         "admin_username": username.current.value,
         "admin_password": password.current.value
      }

      fetch(process.env.REACT_APP_API_URL + '/admin/admins', {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
         .then(res => {
            username.current.value = ''
            password.current.value = ''
         })
         .catch(err => console.log(err))
      setCount(count + 1)
   }

   function deleteUser(evt) {

      const data = {
         "admin_id": evt.currentTarget.dataset.id
      }

      fetch(process.env.REACT_APP_API_URL + '/admin/admins', {
         method: "DELETE",
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
         .catch(err => console.log(err))

      setCount(count + 1)
   }

   useEffect(() => {
      fetch(process.env.REACT_APP_API_URL + '/admin/admins', {
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
         .then(res => res.json())
         .then(data => setUsers(data.data))
         .catch(err => console.log(err))
   }, [count])
   return (
      <div className="create-user">
         <form className="create-user__form" onSubmit={createUserFetch}>
            <input
               className="create-user__input"
               type="text"
               placeholder="username"
               ref={username}
               required
            />
            <input
               className="create-user__input"
               type="password"
               placeholder="password"
               ref={password}
               required
            />
            <button className="create-user__btn" type="submit">Create</button>
         </form>

         <ul className="create-user__list">
            {
               users && users.map(item => {
                  return (
                     <li className="create-user__item" key={item.admin_id}>
                        <p className="create-user__text">{item.admin_username}</p>
                        <button className="create-user__bin-btn" data-id={item.admin_id} onClick={deleteUser}><Bin /></button>
                     </li>
                  )
               })
            }
         </ul>
      </div>
   )
}

export default CreateUser
